import React, { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight, ChevronDown, Clock3, Flame, PackageOpen, Search,
  ShoppingBag, Sparkles, UtensilsCrossed, X
} from 'lucide-react'
import { assetPath } from './paths.js'
import CollectionSlider from './CollectionSlider.jsx'

const formatPrice = price => `${Number(price).toLocaleString('hy-AM')} ֏`

function MenuProductCard({ product, addToCart }) {
  const productImage = assetPath(product.localImage || product.image || '/images/dish-special.webp')
  const imageSet = product.smallImage ? `${assetPath(product.smallImage)} 240w, ${productImage} 480w` : undefined
  return <article className="catalog-card">
    <div className="catalog-card-media">
      <img
        src={productImage}
        srcSet={imageSet}
        sizes="(max-width: 560px) 128px, (max-width: 1080px) 180px, 180px"
        onError={event => { event.currentTarget.onerror = null; event.currentTarget.removeAttribute('srcset'); event.currentTarget.src = assetPath('/images/dish-special.webp') }}
        width="480"
        height="360"
        alt=""
        loading="lazy"
        decoding="async"
      />
      {product.badge && <span>{product.badge}</span>}
    </div>
    <div className="catalog-card-content">
      <div className="catalog-card-topline">
        <small>{product.category}</small>
        {product.dietary && <span className="dietary-tag">{product.dietary}</span>}
      </div>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="catalog-card-bottom">
        <strong>{product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}{formatPrice(product.price)}</strong>
        <button disabled={!product.available} onClick={() => addToCart({ ...product, image: productImage })} aria-label={`${product.name}՝ ավելացնել զամբյուղ`}>
          <ShoppingBag size={16} /> <span>{product.available ? 'Ավելացնել' : 'Սպառված է'}</span>
        </button>
      </div>
    </div>
  </article>
}

export function MenuHero() {
  return <section className="menu-page-hero" aria-labelledby="menu-page-title">
    <img src={assetPath('/images/signature-spread.avif')} srcSet={`${assetPath('/images/signature-spread-mobile.avif')} 780w, ${assetPath('/images/signature-spread.avif')} 1400w`} sizes="100vw" width="1400" height="800" alt="" fetchPriority="high" />
    <div className="menu-page-hero-shade" />
    <div className="shell menu-page-hero-copy">
      <p className="eyebrow light"><span /> Ճանոյի ամբողջական ճաշացանկը</p>
      <h1 id="menu-page-title">Մեր <em>մենյուն</em></h1>
      <p>100 ուտեստ, 10 կատեգորիա և մեկ պարզ սկզբունք՝ ամեն ինչ պատրաստել թարմ ու մատուցել ջերմությամբ։</p>
      <div className="menu-page-highlights">
        <span><Flame /> Պատրաստվում է պատվերից հետո</span>
        <span><Clock3 /> Ամեն օր՝ 10:00–00:00</span>
      </div>
    </div>
  </section>
}

export function MenuContent({ addToCart, categories, products, collections, status, shopInfo }) {
  const requestedCategory = useMemo(() => new URLSearchParams(window.location.search).get('category'), [])
  const requestedCategoryName = useMemo(() => new URLSearchParams(window.location.search).get('categoryName'), [])
  const [activeCategory, setActiveCategory] = useState(requestedCategory || categories[0]?.id || '')
  const [query, setQuery] = useState('')
  const [limit, setLimit] = useState(10)
  const [mobileFilters, setMobileFilters] = useState(false)

  const active = categories.find(category => category.id === activeCategory) || categories[0]
  const normalizedQuery = query.trim().toLocaleLowerCase('hy-AM')
  const matchingProducts = useMemo(() => {
    if (normalizedQuery) {
      return products.filter(product => `${product.name} ${product.description} ${product.category}`.toLocaleLowerCase('hy-AM').includes(normalizedQuery))
    }
    return products.filter(product => product.categoryId === activeCategory)
  }, [activeCategory, normalizedQuery, products])
  const visibleProducts = matchingProducts.slice(0, limit)

  useEffect(() => { setLimit(normalizedQuery ? 20 : 10) }, [activeCategory, normalizedQuery])
  useEffect(() => {
    document.title = 'Մենյու — Jano Restaurant'
    const description = document.querySelector('meta[name="description"]')
    if (description) description.content = 'Jano Restaurant-ի ամբողջական մենյուն՝ հատուկ առաջարկներ, լանչեր, հավաքածուներ, խորոված, նախուտեստներ և ավելին։'
  }, [])
  useEffect(() => {
    const requestedMatch = categories.find(category => String(category.id) === String(requestedCategory) || (requestedCategoryName && category.name === requestedCategoryName))
    if (requestedMatch) {
      setActiveCategory(requestedMatch.id)
    } else if (!categories.some(category => String(category.id) === String(activeCategory))) {
      setActiveCategory(categories[0]?.id || '')
    }
    const heroDescription = document.querySelector('.menu-page-hero-copy > p:not(.eyebrow)')
    if (heroDescription) heroDescription.textContent = `${products.length} ուտեստ, ${categories.length} կատեգորիա և մեկ պարզ սկզբունք՝ ամեն ինչ պատրաստել թարմ ու մատուցել ջերմությամբ։`
  }, [activeCategory, categories, products.length, requestedCategory, requestedCategoryName])

  const chooseCategory = categoryId => {
    setActiveCategory(categoryId)
    setQuery('')
    setMobileFilters(false)
    requestAnimationFrame(() => document.getElementById('catalog-start')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  return <>
    <section className="collection-section" aria-labelledby="collections-title">
      <div className="shell">
        <div className="catalog-section-head">
          <div><p className="eyebrow">Կիսելու համար</p><h2 id="collections-title">Ճանոյի <em>հավաքածուները</em></h2></div>
          <p>Պատրաստի համադրություններ ընտանիքի, ընկերների կամ գրասենյակային ընդմիջման համար։</p>
        </div>
        <CollectionSlider collections={collections} label="Մենյուի Jano box-երը" />
      </div>
    </section>

    <section className="catalog-section" id="catalog-start" aria-labelledby="catalog-title">
      <div className="catalog-sticky">
        <div className="shell catalog-toolbar">
          <label className="catalog-search">
            <Search size={19} />
            <span className="sr-only">Որոնել ամբողջ մենյուում</span>
            <input value={query} onChange={event => setQuery(event.target.value)} placeholder={`Որոնել ${products.length} ուտեստներում…`} />
            {query && <button onClick={() => setQuery('')} aria-label="Մաքրել որոնումը"><X size={17} /></button>}
          </label>
          <button className="mobile-category-trigger" onClick={() => setMobileFilters(value => !value)} aria-expanded={mobileFilters}>
            <UtensilsCrossed size={17} /> {active?.name} <ChevronDown size={16} />
          </button>
          <div className={`catalog-tabs ${mobileFilters ? 'is-open' : ''}`} aria-label="Մենյուի կատեգորիաներ">
            {categories.map(category => <button key={category.id} aria-pressed={!query && activeCategory === category.id} onClick={() => chooseCategory(category.id)}>
              <span>{category.name}</span><small>{category.count ?? 0}</small>
            </button>)}
          </div>
        </div>
      </div>

      <div className="shell catalog-layout">
        <aside className="catalog-sidebar" aria-label="Կատեգորիաներ">
          <div className="sidebar-title"><UtensilsCrossed size={18} /><span>Կատեգորիաներ</span></div>
          {categories.map(category => <button key={category.id} aria-current={!query && activeCategory === category.id ? 'true' : undefined} onClick={() => chooseCategory(category.id)}>
            <span>{category.name}</span><small>{category.count ?? 0}</small>
          </button>)}
          <div className="sidebar-note"><Sparkles /><p><strong>Չե՞ք կողմնորոշվում</strong><span>Զանգահարեք, և կօգնենք կազմել ձեր սեղանը։</span></p></div>
        </aside>

        <div className="catalog-content">
          <div className="catalog-results-head">
            <div>
              <p>{query ? 'Որոնման արդյունքներ' : active?.kicker || 'Ճանոյի մենյու'}</p>
              <h2 id="catalog-title">{query ? `«${query}»` : active?.name}</h2>
            </div>
            <span>{matchingProducts.length} ուտեստ</span>
          </div>
          <div className={`catalog-sync catalog-sync-${status}`} role="status">
            {status === 'loading' && 'Թարմացնում ենք մենյուն…'}
            {status === 'ready' && `Թարմացված է ${shopInfo.name}-ի համակարգից`}
            {status === 'fallback' && 'Ցուցադրվում է պահուստային մենյուն'}
          </div>
          {visibleProducts.length ? <div className="catalog-grid" aria-live="polite">
            {visibleProducts.map(product => <MenuProductCard key={product.id} product={product} addToCart={addToCart} />)}
          </div> : <div className="catalog-empty"><Search /><h3>Ոչինչ չգտանք</h3><p>Փորձեք այլ անվանում կամ ընտրեք կատեգորիաներից մեկը։</p><button className="button button-dark" onClick={() => setQuery('')}>Մաքրել որոնումը</button></div>}
          {visibleProducts.length < matchingProducts.length && <button className="catalog-more" onClick={() => setLimit(value => value + 20)}>
            Ցույց տալ ևս {Math.min(20, matchingProducts.length - visibleProducts.length)} ուտեստ <ChevronDown size={17} />
          </button>}
        </div>
      </div>
    </section>

    <section className="menu-page-cta">
      <div className="shell"><div><PackageOpen /><span><small>Պատվերի օգնություն</small><h2>Կազմե՞նք ձեր սեղանը միասին</h2></span></div><a className="button button-gold" href={`tel:${shopInfo.phoneHref}`}>Զանգահարել՝ {shopInfo.phoneDisplay} <ArrowRight size={17} /></a></div>
    </section>
  </>
}

export default function MenuPage({ addToCart, categories, products, collections, status, shopInfo }) {
  return <main id="main-content" className="menu-page">
    <MenuHero />
    <MenuContent addToCart={addToCart} categories={categories} products={products} collections={collections} status={status} shopInfo={shopInfo} />
  </main>
}
