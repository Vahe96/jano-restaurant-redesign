import React, { useEffect, useMemo } from 'react'
import {
  ArrowLeft, ArrowRight, Check, PackageCheck, Phone, ShoppingBag,
  Sparkles, Tag, UsersRound, UtensilsCrossed
} from 'lucide-react'
import CollectionCard from './CollectionCard.jsx'
import { assetPath, sitePath } from './paths.js'

const formatPrice = price => `${Number(price || 0).toLocaleString('hy-AM')} ֏`

function resolveProducts(collection, allProducts) {
  if (collection?.products?.length) return collection.products
  const ids = new Set((collection?.productIds || []).map(String))
  return allProducts.filter(product => ids.has(String(product.id)))
}

function BoxProductRow({ product }) {
  const quantity = Number(product.quantity) || 1
  const image = assetPath(product.localImage || product.image || '/images/dish-special.webp')
  return <article className="box-product-row">
    <img src={image} alt="" width="210" height="160" loading="lazy" decoding="async" onError={event => { event.currentTarget.onerror = null; event.currentTarget.src = assetPath('/images/dish-special.webp') }} />
    <div className="box-product-copy">
      <p>{product.category || 'Jano-ի խոհանոցից'}</p>
      <h3>{product.name}</h3>
      <span>{product.description || 'Ներառված է բոքսի կազմում։'}</span>
    </div>
    <div className="box-product-price">
      {quantity > 1 && <small>{quantity} հատ</small>}
      <strong>{formatPrice(product.price * quantity)}</strong>
      <span>{quantity > 1 ? `${formatPrice(product.price)} / հատ` : 'առանձին գին'}</span>
    </div>
  </article>
}

export default function BoxPage({ collections, products, status, shopInfo, addToCart }) {
  const requestedId = useMemo(() => new URLSearchParams(window.location.search).get('id'), [])
  const requestedName = useMemo(() => new URLSearchParams(window.location.search).get('name'), [])
  const collection = collections.find(item => String(item.id) === String(requestedId) || (requestedName && item.name === requestedName)) || collections[0]
  const boxProducts = useMemo(() => resolveProducts(collection, products), [collection, products])
  const separateTotal = boxProducts.reduce((sum, product) => sum + Number(product.price || 0) * (Number(product.quantity) || 1), 0)
  const referenceTotal = Math.max(Number(collection?.oldPrice) || 0, separateTotal)
  const savings = Math.max(0, referenceTotal - Number(collection?.price || 0))
  const otherCollections = collections.filter(item => item.id !== collection?.id).slice(0, 3)

  useEffect(() => {
    document.title = collection ? `${collection.name} — Jano Box` : 'Jano Box'
    const description = document.querySelector('meta[name="description"]')
    if (description && collection) description.content = `${collection.name}․ ${collection.description}`
    const prepaintImage = document.getElementById('box-prepaint-image')
    if (prepaintImage && collection) prepaintImage.src = assetPath(collection.localImage || collection.image || '/images/signature-spread.webp')
  }, [collection])

  if (!collection) {
    return <main id="main-content" className="box-page box-page-empty">
      <PackageCheck /><h1>Բոքսերը շուտով հասանելի կլինեն</h1><p>Մինչ այդ կարող եք բացահայտել Jano-ի ամբողջական մենյուն։</p><a className="button button-dark" href={sitePath('menu/')}>Բացել մենյուն</a>
    </main>
  }

  const collectionImage = assetPath(collection.localImage || collection.image || '/images/signature-spread.webp')
  const cartItem = {
    id: `box-${collection.id}`,
    name: collection.name,
    description: collection.description,
    price: Number(collection.price) || 0,
    image: collectionImage,
    category: 'Jano Box',
    collectionId: collection.source === 'api' ? collection.id : undefined,
    productIds: boxProducts.map(product => product.id),
  }

  return <main id="main-content" className="box-page">
    <section className="box-hero">
      <div className="box-hero-media">
        {collection.badge && <span className="box-badge"><Sparkles /> {collection.badge}</span>}
      </div>
      <div className="box-hero-copy">
        <nav className="box-breadcrumb" aria-label="Ուղի"><a href={sitePath()}>Գլխավոր</a><span>/</span><a href={sitePath('menu/#collections-title')}>Բոքսեր</a><span>/</span><b>{collection.name}</b></nav>
        <p className="eyebrow">{collection.kicker || 'Պատրաստի բոքս'}</p>
        <h1>{collection.name}</h1>
        <p className="box-lead">{collection.description}</p>
        <div className="box-facts">
          <span><UsersRound /><small>Նախատեսված է</small><strong>{collection.serves || 'Կիսվելու համար'}</strong></span>
          <span><UtensilsCrossed /><small>Պարունակություն</small><strong>{boxProducts.length} հիմնական ընտրություն</strong></span>
        </div>
        <div className="box-price-panel">
          <div><small>Բոքսի գինը</small><p>{referenceTotal > collection.price && <del>{formatPrice(referenceTotal)}</del>}<strong>{formatPrice(collection.price)}</strong></p></div>
          {savings > 0 && <span><Tag /> Խնայում եք <strong>{formatPrice(savings)}</strong></span>}
        </div>
        <button className="button button-gold box-add" onClick={() => addToCart(cartItem)}>Ավելացնել ամբողջ բոքսը <ShoppingBag size={18} /></button>
        <p className="box-order-note"><Check /> Պարունակությունը և հասանելիությունը կհաստատենք զանգով։</p>
      </div>
    </section>

    <section className="section box-contents" aria-labelledby="box-contents-title">
      <div className="shell box-contents-layout">
        <div className="box-contents-heading">
          <p className="eyebrow">Թափանցիկ գներ</p>
          <h2 id="box-contents-title">Ի՞նչ կա <em>բոքսում</em></h2>
          <p>Յուրաքանչյուր ուտեստ ներկայացված է իր առանձին գնով, որպեսզի առաջարկի արժեքը լինի պարզ և համեմատելի։</p>
          <div className={`catalog-sync catalog-sync-${status}`} role="status">{status === 'ready' ? `Գները թարմացված են ${shopInfo.name}-ի համակարգից` : status === 'loading' ? 'Թարմացնում ենք տվյալները…' : 'Ցուցադրվում են պահուստային գները'}</div>
        </div>
        <div className="box-products-list">
          {boxProducts.map(product => <BoxProductRow key={product.id} product={product} />)}
          {!!collection.includedExtras?.length && <div className="box-extras"><p><PackageCheck /> Գնի մեջ ներառված հավելումներ</p><div>{collection.includedExtras.map(extra => <span key={extra}><Check /> {extra}</span>)}</div></div>}
          <div className="box-value-summary">
            <div><span>Առանձին արժեքների հաշվարկ</span><strong>{formatPrice(referenceTotal)}</strong></div>
            {savings > 0 && <div><span>Ձեր խնայողությունը</span><strong>− {formatPrice(savings)}</strong></div>}
            <div className="box-value-final"><span>Բոքսի վերջնական գինը</span><strong>{formatPrice(collection.price)}</strong></div>
          </div>
        </div>
      </div>
    </section>

    {!!otherCollections.length && <section className="section box-more" aria-labelledby="box-more-title">
      <div className="shell">
        <div className="section-heading">
          <div><p className="eyebrow">Այլ տարբերակներ</p><h2 id="box-more-title">Գտեք ձեր <em>բոքսը</em></h2></div>
          <p>Համեմատեք պատրաստի առաջարկները՝ հյուրերի քանակով, պարունակությամբ և բյուջեով։</p>
        </div>
        <div className="collection-grid box-more-grid">{otherCollections.map(item => <CollectionCard key={item.id} collection={item} compact />)}</div>
        <a className="box-back-link" href={sitePath('menu/#collections-title')}><ArrowLeft /> Վերադառնալ բոլոր բոքսերին</a>
      </div>
    </section>}

    <section className="menu-page-cta">
      <div className="shell"><div><Phone /><span><small>Խմբային պատվեր</small><h2>Պե՞տք է փոխել քանակը կամ կազմը</h2></span></div><a className="button button-gold" href={`tel:${shopInfo.phoneHref}`}>Քննարկել պատվերը <ArrowRight size={17} /></a></div>
    </section>
  </main>
}
