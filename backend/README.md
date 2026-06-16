# DeepTechX Tx Submission Worker (Cloudflare)

Logs crypto payment submissions from the DeepTechX UI to a Cloudflare KV
namespace and (optionally) forwards them to a webhook for instant notification.
The operator reconciles each submission against their wallet manually.

## Why no on-chain verification

The UI exposes a single human-readable wallet handle (`desireyavro.x`)
that resolves to many chains via Unstoppable Domains. The submission does
not include a chain hint, so we can't reliably inspect a single explorer.
Manual reconciliation against the wallet is both simpler and more accurate
for a low-volume launch.

If you later want automated verification, add a `chain` field to the
submission payload (frontend) and a chain-specific verifier in the worker.

## One-time setup

```bash
cd backend
npm install
npx wrangler login                                # one-time browser auth
npx wrangler kv namespace create SUBMISSIONS      # paste the id into wrangler.jsonc
npx wrangler secret put WEBHOOK_URL               # optional Slack/Discord URL
```

Open `wrangler.jsonc` and replace `REPLACE_WITH_KV_NAMESPACE_ID` with the id
returned above.

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

In the DeepTechX repo root, create `.env.local` (already gitignored):

```
VITE_VERIFY_TX_URL=https://deeptechx-tx-verifier.<your-subdomain>.workers.dev
```

Restart `npm run dev`. The wallet checkout will now POST submissions to the
worker; without the env var it falls back to optimistic UX (submission shown
as accepted, you reconcile by checking the wallet manually).

## Endpoint contract

`POST /` (any path)

```json
{
  "tier": "Lifetime Access",
  "amountUSD": 597,
  "wallet": "desireyavro.x",
  "txHash": "0x… or tx ref",
  "email": "buyer@example.com"
}
```

Responses:

- `200 { "status": "submitted", "submissionId": "uuid" }` — logged + webhook fired
- `400 / 405` — malformed request

## Audit log

Every submission is stored in the `SUBMISSIONS` KV namespace for 90 days.

```bash
npx wrangler kv key list --binding=SUBMISSIONS
npx wrangler kv key get <id> --binding=SUBMISSIONS
```

## Webhook payload shape

If `WEBHOOK_URL` is set, the same record is POSTed there with
`Content-Type: application/json`. Works with Slack incoming webhooks
(format the record into a Slack message in a Cloudflare worker chain or
use Zapier), Discord, or Zapier.

## Next steps when you want them

- Email delivery on submission (Resend / Mailgun)
- Per-chain automated verification (add `chain` to payload)
- Rate limit + Turnstile to block submission abuse
