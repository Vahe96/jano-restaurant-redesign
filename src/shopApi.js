import { shopConfig } from './shopConfig.js'

export class ShopApiError extends Error {
  constructor(message, status = 0) {
    super(message)
    this.name = 'ShopApiError'
    this.status = status
  }
}

const unwrapData = payload => payload?.data ?? payload

async function get(path, signal) {
  if (!shopConfig.isConfigured) {
    throw new ShopApiError('Shop API configuration is missing')
  }

  const response = await fetch(`${shopConfig.apiBaseUrl}${path}`, {
    headers: { Accept: 'application/json' },
    signal,
  })

  if (!response.ok) {
    throw new ShopApiError(`Shop API request failed with ${response.status}`, response.status)
  }

  return unwrapData(await response.json())
}

export async function fetchShopBootstrap(signal) {
  const appPath = shopConfig.appId
  const requests = {
    app: get(`/app/get/${appPath}`, signal),
    catalog: get(`/category/product/${appPath}`, signal),
    collections: get(`/collections/${appPath}`, signal),
    topProducts: get(`/product/top-product/${appPath}`, signal),
    about: get(`/about-pages/${appPath}`, signal),
  }
  const entries = await Promise.all(Object.entries(requests).map(async ([key, request]) => {
    try {
      return [key, await request, null]
    } catch (error) {
      if (error?.name === 'AbortError') throw error
      return [key, null, error]
    }
  }))

  return entries.reduce((result, [key, value, error]) => {
    result.data[key] = value
    if (error) result.errors[key] = error.message
    return result
  }, { data: {}, errors: {} })
}
