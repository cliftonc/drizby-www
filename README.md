# drizby-www

Marketing site for [Drizby](https://github.com/cliftonc/drizby) — an open-source BI platform powered by [drizzle-cube](https://github.com/cliftonc/drizzle-cube).

Static Astro site deployed to Cloudflare Workers at [drizby.com](https://drizby.com).

## Dev

```bash
npm install
npm run dev      # localhost:4321
npm run build    # output to ./dist
```

## Deploy

```bash
npx wrangler pages deploy dist
```
