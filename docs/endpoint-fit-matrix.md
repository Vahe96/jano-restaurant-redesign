# Jano frontend endpoint fit matrix

Configuration: `VITE_API_BASE_URL` and `VITE_SHOP_APP_ID`. The production storefront uses app ID 16.

| Frontend area | User intent | Existing files/components | Backend endpoint(s) | Auth | Data and mapping | Decision |
| --- | --- | --- | --- | --- | --- | --- |
| App shell | See current restaurant contact details | `SiteChrome.jsx` Header/Footer/cart CTA | `GET /app/get/{app_id}` | No | Normalize Laravel `data`, phone display/link, and nullable address | Use with design-safe fallbacks |
| Home story | Learn Jano's history | `main.jsx` `Story` | `GET /about-pages/{app_id}` | No | Map title, plain description, and image URL | Use with local image/text fallback |
| Home menu preview | Discover representative dishes | `main.jsx` `MenuSection` | `GET /category/product/{app_id}`, `GET /product/top-product/{app_id}` | No | Flatten category tree, normalize products, prioritize configured top product | Use; show six products without blocking first paint |
| Menu navigation | Browse all categories | `MenuPage.jsx` category tabs/sidebar | `GET /category/product/{app_id}` | No | Category ID, name, visible product count | Use |
| Menu grid | Browse the complete current catalog | `MenuPage.jsx` product cards | `GET /category/product/{app_id}` | No | Effective price is `new_price ?? price`; map media, badges, status, description | Use; preserve static catalog if API is unavailable |
| Menu search | Find dishes within this storefront | `MenuPage.jsx` search | Loaded app-scoped catalog | No | Search name, description, and category client-side | Use local filtering to avoid cross-app results from the non-app-scoped search route |
| Collection shelf | Choose curated packages | `MenuPage.jsx` collection cards | `GET /collections/{app_id}` | No | Normalize array-valued `media_url`, package price, exact product members | Use when populated; app 16 currently returns an empty list, so retain curated static fallback |
| Blog | Read news | No blog route/component | `GET /blogs/{app_id}` | No | App 16 currently returns an empty list | Defer; do not add empty UI |
| Product detail | Inspect one product | No product-detail route | `GET /product/{product_id}` | No | Product ID would come from the current app catalog | Defer until the route exists |
| Guest cart | Keep a draft phone order | `SiteChrome.jsx` local cart | No suitable unauthenticated endpoint | No | Existing localStorage draft | Keep local; label as phone order |
| Customer auth/profile | Sign in and manage account | No auth/account UI | `/user/*` | Yes where applicable | Passport access/refresh token lifecycle required | Defer; never call protected routes anonymously |
| Server cart/order/payment | Checkout and pay | No authenticated checkout/payment UI | `/cart/*`, `/order`, `/payments/*` | Yes | Requires auth, server-authoritative prices, returned `order_ids`, provider handoff | Defer as a separate end-to-end flow; do not simulate it |

Public API failures never erase the usable storefront. The UI starts with curated local content, updates from the app-scoped API, exposes a small sync state, and keeps the fallback on network or contract failure.
