# Duck AI Worker

Cloudflare Worker for the portfolio Duck assistant.

## Deploy

```bash
cd worker
npx wrangler deploy
```

The Worker uses a Workers AI binding named `AI`. The current config allows requests from `https://fanadape.pages.dev`.

After deployment, point the frontend to the Worker endpoint:

```env
VITE_DUCK_API_URL=https://<worker-name>.<account>.workers.dev/api/duck
```

If the Worker is unavailable or the request fails, the portfolio keeps using its local fallback answers.

Rate limiting should be added at deploy time with a Cloudflare Rate Limiting binding once the account-specific namespace is available.
