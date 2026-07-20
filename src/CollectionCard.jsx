import React from 'react'
import { ArrowRight } from 'lucide-react'
import { assetPath, sitePath } from './paths.js'

const formatPrice = price => `${Number(price).toLocaleString('hy-AM')} ֏`

export function collectionPath(collection) {
  const image = assetPath(collection.localImage || collection.image || '/images/signature-spread.webp')
  return sitePath(`box/?id=${encodeURIComponent(collection.id)}&name=${encodeURIComponent(collection.name)}&image=${encodeURIComponent(image)}`)
}

export default function CollectionCard({ collection, compact = false }) {
  const collectionImage = assetPath(collection.localImage || collection.image || '/images/signature-spread.webp')
  const imageSet = collection.smallImage ? `${assetPath(collection.smallImage)} 760w, ${collectionImage} 900w` : undefined

  return <a className={`collection-card${compact ? ' collection-card-compact' : ''}`} href={collectionPath(collection)} aria-label={`${collection.name}․ դիտել բոքսի պարունակությունը`}>
    <img src={collectionImage} srcSet={imageSet} sizes={compact ? '(max-width: 820px) 100vw, 33vw' : '(max-width: 820px) 100vw, 50vw'} onError={event => { event.currentTarget.onerror = null; event.currentTarget.removeAttribute('srcset'); event.currentTarget.src = assetPath('/images/signature-spread.webp') }} alt="" width="900" height="620" loading="lazy" decoding="async" />
    <div className="collection-shade" />
    <div className="collection-copy">
      <div><small>{collection.kicker || 'Պատրաստի բոքս'}</small>{collection.serves && <span>{collection.serves}</span>}</div>
      <h3>{collection.name}</h3>
      <p>{collection.description}</p>
      <ul aria-label="Բոքսի պարունակությունը">
        {(collection.items || collection.products?.map(product => product.name) || []).slice(0, compact ? 2 : 3).map(item => <li key={item}>{item}</li>)}
      </ul>
      <div className="collection-action">
        <p>{collection.oldPrice && <del>{formatPrice(collection.oldPrice)}</del>}<strong>{formatPrice(collection.price)}</strong></p>
        <span className="collection-cta">Դիտել բոքսը <ArrowRight size={16} /></span>
      </div>
    </div>
  </a>
}
