const apiBaseUrl = String(import.meta.env.VITE_API_BASE_URL || '').trim().replace(/\/+$/, '')
const appId = Number.parseInt(String(import.meta.env.VITE_SHOP_APP_ID || ''), 10)

export const shopConfig = Object.freeze({
  apiBaseUrl,
  appId,
  isConfigured: Boolean(apiBaseUrl && Number.isInteger(appId) && appId > 0),
})
