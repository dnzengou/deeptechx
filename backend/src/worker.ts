// DeepTechX tx verification worker
//
// Receives POST /verify-tx with { tier, amountUSD, chain, txHash, email },
// verifies the transaction exists on the right chain and pays the treasury
// address, then logs a row to a Cloudflare KV store for off-line reconciliation.
//
// Amount validation (USD → token) is intentionally NOT enforced here — prices
// are volatile and the operator reconciles manually. The verifier confirms:
//   1. tx exists and is mined
//   2. recipient address matches the configured treasury for that chain
//
// Env (set via `wrangler secret put`):
//   ETHERSCAN_API_KEY   — works for ETH, BSC, Polygon, etc. (v2 multi-chain)
//   TONCENTER_API_KEY   — optional; free tier works without
//   TREASURY_EVM        — 0x… EVM treasury address (lowercased)
//   TREASURY_TON        — TON treasury address (raw form)
//   SUBMISSIONS         — KV namespace binding for audit log

export interface Env {
  ETHERSCAN_API_KEY: string
  TONCENTER_API_KEY?: string
  TREASURY_EVM: string
  TREASURY_TON: string
  SUBMISSIONS: KVNamespace
}

type Payload = {
  tier: string
  amountUSD: number
  chain: string
  txHash: string
  email: string
}

const ETHERSCAN_V2 = 'https://api.etherscan.io/v2/api'

const CHAIN_IDS: Record<string, number> = {
  eth: 1,
  bnb: 56,
  'usdc-eth': 1,
  'usdt-bsc': 56,
  wbtc: 1,
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

function json(body: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS, ...(init.headers || {}) },
  })
}

async function verifyEvm(env: Env, chainId: number, txHash: string): Promise<{ ok: boolean; reason?: string; to?: string }> {
  const url = `${ETHERSCAN_V2}?chainid=${chainId}&module=proxy&action=eth_getTransactionByHash&txhash=${txHash}&apikey=${env.ETHERSCAN_API_KEY}`
  const r = await fetch(url)
  if (!r.ok) return { ok: false, reason: `etherscan ${r.status}` }
  const data = await r.json<{ result?: { to?: string; blockNumber?: string } }>()
  const tx = data.result
  if (!tx || !tx.blockNumber) return { ok: false, reason: 'tx not yet mined' }
  const to = (tx.to || '').toLowerCase()
  if (to !== env.TREASURY_EVM.toLowerCase()) {
    return { ok: false, reason: `recipient mismatch (${to})`, to }
  }
  return { ok: true, to }
}

async function verifyTon(env: Env, txHash: string): Promise<{ ok: boolean; reason?: string }> {
  const headers: Record<string, string> = {}
  if (env.TONCENTER_API_KEY) headers['X-API-Key'] = env.TONCENTER_API_KEY
  const url = `https://toncenter.com/api/v2/getTransactions?address=${encodeURIComponent(env.TREASURY_TON)}&limit=50`
  const r = await fetch(url, { headers })
  if (!r.ok) return { ok: false, reason: `toncenter ${r.status}` }
  const data = await r.json<{ result?: Array<{ transaction_id?: { hash?: string } }> }>()
  const found = (data.result || []).some(t => (t.transaction_id?.hash || '').toLowerCase() === txHash.toLowerCase())
  if (!found) return { ok: false, reason: 'tx not found in recent treasury txs' }
  return { ok: true }
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS_HEADERS })
    if (req.method !== 'POST') return json({ error: 'method not allowed' }, { status: 405 })

    let body: Payload
    try {
      body = await req.json()
    } catch {
      return json({ error: 'invalid json' }, { status: 400 })
    }

    if (!body.tier || !body.chain || !body.txHash || !body.email) {
      return json({ error: 'missing required field' }, { status: 400 })
    }

    let verification: { ok: boolean; reason?: string; to?: string }
    if (body.chain === 'ton') {
      verification = await verifyTon(env, body.txHash)
    } else {
      const chainId = CHAIN_IDS[body.chain]
      if (!chainId) return json({ error: `unsupported chain: ${body.chain}` }, { status: 400 })
      verification = await verifyEvm(env, chainId, body.txHash)
    }

    const submissionId = crypto.randomUUID()
    const record = {
      id: submissionId,
      tier: body.tier,
      amountUSD: body.amountUSD,
      chain: body.chain,
      txHash: body.txHash,
      email: body.email,
      verified: verification.ok,
      reason: verification.reason || null,
      timestamp: new Date().toISOString(),
    }
    await env.SUBMISSIONS.put(submissionId, JSON.stringify(record), { expirationTtl: 60 * 60 * 24 * 90 })

    if (!verification.ok) {
      return json({ status: 'pending', message: verification.reason, submissionId }, { status: 202 })
    }
    return json({ status: 'verified', submissionId })
  },
}
