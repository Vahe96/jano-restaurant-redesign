import { useEffect, useMemo, useState } from 'react'
import { menuCategories, menuCollections, menuProducts } from './menuData.js'
import { fetchShopBootstrap } from './shopApi.js'
import { shopConfig } from './shopConfig.js'

const CACHE_KEY = `jano-shop-bootstrap:${shopConfig.appId || 'unknown'}`
const CACHE_TTL = 5 * 60 * 1000

const badgeLabels = {
  new: 'Նոր',
  best_seller: 'Բեսթսելեր',
  special_offer: 'Հատուկ առաջարկ',
  discount: 'Զեղչ',
  recommended: 'Խորհուրդ ենք տալիս',
  limited: 'Սահմանափակ',
}

export const fallbackShopInfo = {
  name: 'Jano Restaurant',
  email: 'janorestaurant@hotmail.com',
  phoneDisplay: '060 50 19 46',
  phoneHref: '+37460501946',
  address: 'Տիգրան Մեծի պող. 59',
}

const fallbackAbout = {
  title: 'Համ, որը փոխանցվում է սերնդեսերունդ',
  description: 'Ճանոն սկսվել է ընտանեկան խոհանոցից՝ մի պարզ համոզմամբ․ լավ ուտեստը մարդկանց մեկ սեղանի շուրջ է հավաքում։\nԱյսօր մենք պահպանում ենք հայկական ու մերձավորարևելյան խոհանոցի ծանոթ համերը՝ պատրաստելով ամեն ինչ թարմ բաղադրիչներով, ձեռքի աշխատանքով և մեր ընտանիքի հյուրընկալությամբ։',
  image: '/images/heritage-craft.webp',
  imageSmall: '/images/heritage-craft-mobile.webp',
}

const fallbackProducts = menuProducts.map(product => ({
  ...product,
  localImage: `/images/menu/${product.id}.webp`,
  smallImage: `/images/menu/${product.id}-sm.webp`,
  available: true,
  source: 'fallback',
}))

const fallbackCollections = menuCollections.map(collection => ({
  ...collection,
  localImage: `/images/menu/box-${collection.id}.webp`,
  smallImage: `/images/menu/box-${collection.id}-sm.webp`,
  products: (collection.productIds || []).map(productId => fallbackProducts.find(product => product.id === productId)).filter(Boolean),
  source: 'fallback',
}))

const fallbackState = {
  shopInfo: fallbackShopInfo,
  about: fallbackAbout,
  categories: menuCategories,
  products: fallbackProducts,
  collections: fallbackCollections,
  featuredProductIds: [],
  source: 'fallback',
}

function normalizePhone(phone) {
  const digits = String(phone || '').replace(/\D/g, '')
  if (!digits) return { display: fallbackShopInfo.phoneDisplay, href: fallbackShopInfo.phoneHref }
  const local = digits.startsWith('374') ? `0${digits.slice(3)}` : digits
  const display = local.length === 9
    ? `${local.slice(0, 3)} ${local.slice(3, 5)} ${local.slice(5, 7)} ${local.slice(7)}`
    : String(phone)
  const href = digits.startsWith('374') ? `+${digits}` : digits.startsWith('0') ? `+374${digits.slice(1)}` : `+${digits}`
  return { display, href }
}

function normalizeShopInfo(app) {
  if (!app) return fallbackShopInfo
  const phone = normalizePhone(app.phone)
  return {
    name: app.name || fallbackShopInfo.name,
    email: app.email || fallbackShopInfo.email,
    phoneDisplay: phone.display,
    phoneHref: phone.href,
    address: app.address || fallbackShopInfo.address,
  }
}

function normalizeProduct(product, category) {
  const salePrice = Number(product.new_price)
  const regularPrice = Number(product.price) || 0
  const hasSale = Number.isFinite(salePrice) && salePrice > 0 && salePrice < regularPrice
  return {
    id: product.id,
    categoryId: String(category.id),
    category: category.name,
    name: product.name || 'Ուտեստ',
    description: product.description || 'Մանրամասները ճշտեք մեր թիմից։',
    price: hasSale ? salePrice : regularPrice,
    oldPrice: hasSale ? regularPrice : null,
    image: product.media_urls?.[0] || '',
    badge: badgeLabels[product.badges?.[0]] || null,
    available: product.status !== 'out_of_stock',
    status: product.status,
    source: 'api',
  }
}

function normalizeCatalog(tree = []) {
  const categories = []
  const products = []
  const walk = nodes => nodes.forEach(category => {
    const ownProducts = (category.products || []).map(product => normalizeProduct(product, category))
    categories.push({
      id: String(category.id),
      name: category.name,
      kicker: ownProducts.length ? `${ownProducts.length} ուտեստ` : 'Շուտով',
      count: ownProducts.length,
      productCount: ownProducts.length,
      image: ownProducts[0]?.image || '/images/dish-special.webp',
    })
    products.push(...ownProducts)
    walk(category.subcategories || [])
  })
  walk(Array.isArray(tree) ? tree : [])
  return { categories, products }
}

function normalizeCollections(collections = []) {
  return (Array.isArray(collections) ? collections : []).map(collection => {
    const products = (collection.products || []).map(product => {
      const regularPrice = Number(product.price) || 0
      const salePrice = Number(product.new_price)
      const hasSale = Number.isFinite(salePrice) && salePrice > 0 && salePrice < regularPrice
      return {
        id: product.id,
        name: product.name || 'Ուտեստ',
        description: product.description || 'Ներառված է բոքսի կազմում։',
        price: hasSale ? salePrice : regularPrice,
        oldPrice: hasSale ? regularPrice : null,
        image: product.media_urls?.[0] || '/images/dish-special.webp',
        quantity: Number(product.quantity || product.pivot?.quantity) || 1,
        category: 'Բոքսի պարունակություն',
        available: product.status !== 'out_of_stock',
      }
    })
    const price = Number(collection.price) || 0
    const separateTotal = products.reduce((sum, product) => sum + product.price * product.quantity, 0)
    return {
      id: String(collection.id),
      name: collection.name,
      kicker: 'Պատրաստի բոքս',
      description: collection.description || `${products.length} ընտրված ուտեստ՝ մեկ պատրաստի բոքսում։`,
      items: products.map(product => product.quantity > 1 ? `${product.name} · ${product.quantity} հատ` : product.name),
      products,
      price,
      oldPrice: separateTotal > price ? separateTotal : null,
      image: collection.media_url?.[0] || collection.products?.[0]?.media_urls?.[0] || '/images/signature-spread.webp',
      source: 'api',
    }
  })
}

function normalizeBootstrap(result) {
  const catalog = normalizeCatalog(result.data.catalog)
  const remoteCollections = normalizeCollections(result.data.collections)
  return {
    shopInfo: normalizeShopInfo(result.data.app),
    about: result.data.about ? {
      title: /[\u0530-\u058F]/.test(result.data.about.title || '') ? result.data.about.title : fallbackAbout.title,
      description: result.data.about.description || fallbackAbout.description,
      image: result.data.about.image_url || fallbackAbout.image,
    } : fallbackAbout,
    categories: catalog.categories.length ? catalog.categories : menuCategories,
    products: catalog.products.length ? catalog.products : fallbackProducts,
    collections: remoteCollections.length ? remoteCollections : fallbackCollections,
    featuredProductIds: (result.data.topProducts || []).map(item => item.product_id),
    source: catalog.products.length ? 'api' : 'fallback',
    errors: result.errors,
  }
}

function readCache() {
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) || 'null')
    if (!cached || Date.now() - cached.savedAt > CACHE_TTL) return null
    return cached.data
  } catch {
    return null
  }
}

export function useShopData() {
  const cached = useMemo(readCache, [])
  const [data, setData] = useState(cached || fallbackState)
  const [status, setStatus] = useState(cached ? 'ready' : 'loading')

  useEffect(() => {
    if (cached || !shopConfig.isConfigured) {
      if (!shopConfig.isConfigured) setStatus('fallback')
      return undefined
    }
    const controller = new AbortController()
    fetchShopBootstrap(controller.signal)
      .then(result => {
        const normalized = normalizeBootstrap(result)
        setData(normalized)
        setStatus(normalized.source === 'api' ? 'ready' : 'fallback')
        try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), data: normalized })) } catch { /* cache is optional */ }
      })
      .catch(error => {
        if (error?.name !== 'AbortError') setStatus('fallback')
      })
    return () => controller.abort()
  }, [cached])

  return { ...data, status }
}

export function selectFeaturedProducts(products, featuredProductIds, limit = 6) {
  const featured = new Set(featuredProductIds.map(String))
  const ordered = [...products].sort((a, b) => Number(featured.has(String(b.id))) - Number(featured.has(String(a.id))))
  const selected = []
  const usedCategories = new Set()

  for (const product of ordered) {
    if (usedCategories.has(product.categoryId)) continue
    selected.push(product)
    usedCategories.add(product.categoryId)
    if (selected.length === limit) return selected
  }

  for (const product of ordered) {
    if (selected.some(item => item.id === product.id)) continue
    selected.push(product)
    if (selected.length === limit) break
  }
  return selected
}
