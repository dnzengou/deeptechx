# DeepTechX Tx Verifier (Cloudflare Worker)

Verifies crypto payment submissions from the DeepTechX UI. Confirms the
transaction exists on its chain and that the recipient is the configured
treasury address. Logs each submission to a KV namespace for off-line
reconciliation. No database or persistent server required.

## What it verifies

- **EVM chains** (ETH, BSC, ERC-20 / BEP-20 tokens including USDC, USDT, WBTC)
  via the Etherscan v2 multi-chain API (single API key works across all
  supported EVM chains)
- **TON** via toncenter.com (free tier works without a key)

It does **not** verify the USD/token-amount conversion — token prices are
volatile and the operator reconciles manually using the audit log.

## One-time setup

```bash
cd backend
npm install
npx wrangler login                                # one-time browser auth
npx wrangler kv namespace create SUBMISSIONS      # paste the id into wrangler.jsonc
npx wrangler secret put ETHERSCAN_API_KEY         # get a free key at etherscan.io
npx wrangler secret put TONCENTER_API_KEY         # optional
```

Update `wrangler.jsonc` with the KV namespace `id` returned above and confirm
`TREASURY_EVM` / `TREASURY_TON` match your live wallets.

## Run locally

```bash
npm run dev
# Worker listens on http://localhost:8787
```

## Deploy

```bash
npm run deploy
# Outputs the production URL, e.g. https://deeptechx-tx-verifier.<your-subdomain>.workers.dev
```

## Wire the frontend

In the DeepTechX repo root, create a `.env.local` (already gitignored):

```
VITE_VERIFY_TX_URL=https://deeptechx-tx-verifier.<your-subdomain>.workers.dev
```

Restart `npm run dev`. The crypto checkout modal will now POST submissions to
the Worker; without the env var it falls back to the optimistic UI flow
(submission accepted, you reconcile by checking the wallet manually).

## Endpoint contract

`POST /` (any path)

```json
{
  "tier": "Lifetime Access",
  "amountUSD": 597,
  "chain": "eth",           // ton | eth | bnb | usdc-eth | usdt-bsc | wbtc
  "txHash": "0x…",
  "email": "buyer@example.com"
}
```

Responses:

- `200 { "status": "verified", "submissionId": "uuid" }` — tx mined, recipient matches
- `202 { "status": "pending", "message": "tx not yet mined", "submissionId": "uuid" }` — submission logged, will reconcile
- `400 / 405` — malformed request

## Audit log

Every submission (verified or pending) is stored in the `SUBMISSIONS` KV
namespace for 90 days. Inspect via:

```bash
npx wrangler kv key list --binding=SUBMISSIONS
npx wrangler kv key get <id> --binding=SUBMISSIONS
```

## Next steps when you want them

- Email delivery on verified payments (Resend / Mailgun)
- USD/token amount enforcement using a Pyth or CoinGecko spot price
- Rate limit + Turnstile to block submission abuse
- Slack / Discord webhook on each verified submission
