// DeepTechX tx submission worker
//
// Receives POST /verify-tx with { tier, amountUSD, wallet, txHash, email },
// logs the submission to a Cloudflare KV namespace for off-line reconciliation,
// and (optionally) pings a webhook so the operator gets notified immediately.
//
// On-chain verification is intentionally out of scope: the buyer pays to a
// human-readable wallet handle (e.g. desireyavro.x) which resolves to many
// chains via Unstoppable Domains. We can't reliably infer which chain to
// inspect from the submission alone, so the operator reconciles by checking
// their wallet against the audit log.
//
// Env (set via `wrangler secret put`):
//   WEBHOOK_URL          — optional; POSTs the record on every submission
//                          (Slack/Discord/Zapier/etc.)
//   SUBMISSIONS          — KV namespace binding for the audit log

export interface Env {
  WEBHOOK_URL?: string
  SUBMISSIONS: KVNamespace
}

type Payload = {
  tier: string
  amountUSD: number
  wallet: string
  txHash: string
  email: string
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

async function notifyWebhook(env: Env, record: unknown): Promise<void> {
  if (!env.WEBHOOK_URL) return
  try {
    await fetch(env.WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
    })
  } catch {
    // Webhook is best-effort — never block the submission response on it.
  }
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

    if (!body.tier || !body.wallet || !body.txHash || !body.email) {
      return json({ error: 'missing required field' }, { status: 400 })
    }

    const submissionId = crypto.randomUUID()
    const record = {
      id: submissionId,
      tier: body.tier,
      amountUSD: body.amountUSD,
      wallet: body.wallet,
      txHash: body.txHash,
      email: body.email,
      timestamp: new Date().toISOString(),
    }

    await env.SUBMISSIONS.put(submissionId, JSON.stringify(record), { expirationTtl: 60 * 60 * 24 * 90 })
    await notifyWebhook(env, record)

    return json({ status: 'submitted', submissionId })
  },
}
