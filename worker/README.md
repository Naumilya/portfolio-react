# Duck AI Worker

Cloudflare Worker for the portfolio Duck assistant.

## What is configured

- Workers AI binding: `AI`;
- rate-limit binding: `DUCK_RATE_LIMITER`;
- 8 AI requests per 60 seconds per browser client id;
- request size and message length validation;
- CORS restricted to `https://fanadape.pages.dev`;
- frontend fallback stays active if the Worker is unavailable.

The rate-limit `namespace_id = "1001"` is a user-defined integer that only needs to be unique inside the Cloudflare account.

## Deploy from GitHub Actions

Add these repository secrets:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`

The API token should be scoped to the Cloudflare account and have permission to edit Workers.

Then run the `Deploy Duck Worker` workflow manually from GitHub Actions.

## Deploy locally

```bash
cd worker
npx wrangler@^4.102.0 deploy
```

Wrangler will use `wrangler.toml` as the Worker configuration.

## Connect the portfolio

After deployment, copy the Worker URL and set this environment variable in the Cloudflare Pages project:

```env
VITE_DUCK_API_URL=https://<worker-name>.<account-subdomain>.workers.dev/api/duck
```

Redeploy the Pages project after changing the environment variable.

If `VITE_DUCK_API_URL` is missing, unreachable, rate-limited, or the AI backend fails, the portfolio automatically uses its local fallback answers.
