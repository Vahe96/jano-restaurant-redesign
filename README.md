# Jano Restaurant Redesign

A performance-first Jano storefront redesign built with Vite, Preact compatibility, and the production Mini shop API.

## Run locally

```bash
npm install
npm run dev
```

Open:

- `http://localhost:5173/`
- `http://localhost:5173/menu/`

## Shop API configuration

The public Vite configuration is stored in `.env.development` and `.env.production`:

```dotenv
VITE_API_BASE_URL=https://backend.min4max.net/api
VITE_SHOP_APP_ID=16
```

The frontend loads app information, the category/product catalog, top-product configuration, collections, and about content. The current production catalog contains 12 categories and 151 visible products. Static catalog and collection content remains as a resilient fallback.

The endpoint decisions are documented in [`docs/endpoint-fit-matrix.md`](docs/endpoint-fit-matrix.md).

## Intentionally out of scope

Payment providers and HDM/PEK fiscal integrations are not connected or modified. The current cart is a local guest draft for phone ordering; authenticated checkout is a separate future flow.

## Verification

```bash
npm run build
npm audit --audit-level=high
```

The home and menu production builds score 100 in Lighthouse desktop for Performance, Accessibility, Best Practices, and SEO.
