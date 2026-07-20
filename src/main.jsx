import React, { useEffect, useMemo, useState } from 'react'
import { render } from 'preact'
import { createPortal } from 'react-dom'
import {
  ArrowRight, Check, ChefHat, Clock3, Phone, Plus, Search, Sparkles
} from 'lucide-react'
import './styles.css'
import { CartDrawer, CartFeedback, Footer, Header, useCartState } from './SiteChrome.jsx'
import { selectFeaturedProducts, useShopData } from './useShopData.js'

document.documentElement.dataset.stylesReady = ''

function Story({ about }) {
  const paragraphs = String(about.description || '').split(/\r?\n+/).filter(Boolean).slice(0, 2)
  return <section className="section story-section" id="story">
    <div className="shell story-grid">
      <div className="story-media reveal">
        <img src={about.image} srcSet={about.imageSmall ? `${about.imageSmall} 520w, ${about.image} 900w` : undefined} onError={event => { event.currentTarget.onerror = null; event.currentTarget.removeAttribute('srcset'); event.currentTarget.src = '/images/heritage-craft.webp' }} sizes="(max-width: 560px) 85vw, 540px" width="900" height="1125" alt="Jano ռեստորանի պատմությունը" loading="lazy" />
        <div className="year-seal"><span>Հիմնադրվել է</span><strong>1946</strong><span>Երևան</span></div>
      </div>
      <div className="story-copy reveal">
        <p className="eyebrow">Մեր պատմությունը</p>
        <h2>{about.title}</h2>
        {paragraphs.map((paragraph, index) => <p className={index === 0 ? 'lead' : undefined} key={paragraph.slice(0, 40)}>{paragraph}</p>)}
        <div className="story-values">
          <div><ChefHat /><span><strong>Ձեռքի աշխատանք</strong><small>Ամեն օր՝ մեր խոհանոցում</small></span></div>
          <div><Sparkles /><span><strong>Ընտանեկան բաղադրատոմսեր</strong><small>Պահպանված 1946-ից</small></span></div>
        </div>
        <a className="text-link" href="/menu/">Բացահայտել մեր խոհանոցը <ArrowRight size={17} /></a>
      </div>
    </div>
  </section>
}

function MenuSection({ addToCart, categories, products, totalProducts }) {
  const [active, setActive] = useState('all')
  const [query, setQuery] = useState('')
  const visible = useMemo(() => products.filter(dish => (!query && (active === 'all' || dish.categoryId === active)) || (query && `${dish.name} ${dish.description}`.toLocaleLowerCase('hy-AM').includes(query.toLocaleLowerCase('hy-AM')))), [active, products, query])
  const tabs = [{ id: 'all', name: 'Բոլորը' }, ...categories]
  return <section className="section menu-section" id="menu">
    <div className="shell">
      <div className="section-heading reveal">
        <div><p className="eyebrow">Ճանոյի ընտրանին</p><h2>Ծանոթ համեր,<br /><em>պատրաստված այսօր</em></h2></div>
        <p>Մեր մենյուն միավորում է հայկական սեղանի ջերմությունն ու Մերձավոր Արևելքի բուրավետ խոհանոցը։</p>
      </div>
      <div className="menu-toolbar reveal">
        <div className="category-tabs" aria-label="Ուտեստների կատեգորիաներ">
          {tabs.map(category => <button key={category.id} aria-pressed={active === category.id && !query} onClick={() => { setActive(category.id); setQuery('') }}>{category.name}</button>)}
        </div>
        <label className="menu-search"><Search size={18} /><span className="sr-only">Որոնել մենյուում</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Որոնել ուտեստը" /></label>
      </div>
      <figure className="menu-visual reveal">
        <img src="/images/signature-spread.webp" srcSet="/images/signature-spread-mobile.webp 700w, /images/signature-spread-tablet.webp 900w, /images/signature-spread.webp 1400w" sizes="(max-width: 820px) 100vw, 1240px" width="1400" height="800" alt="Ճանոյի հայկական և մերձավորարևելյան ուտեստների սեղանը" loading="lazy" />
        <figcaption><small>Սեղանը կիսելու համար է</small><strong>7 համ · 1 պատմություն</strong></figcaption>
      </figure>
      <div className="dish-grid" aria-live="polite">
        {visible.map(dish => <article className="dish-card reveal" key={dish.id}>
          <div className="dish-image-wrap"><img src={dish.localImage || dish.image} srcSet={dish.smallImage ? `${dish.smallImage} 480w, ${dish.localImage || dish.image} 720w` : undefined} onError={event => { event.currentTarget.onerror = null; event.currentTarget.removeAttribute('srcset'); event.currentTarget.src = '/images/dish-special.webp' }} sizes="(max-width: 560px) calc(100vw - 30px), (max-width: 1080px) 50vw, 33vw" alt="" loading="lazy" width="720" height="540" />{dish.badge && <span className="dish-badge">{dish.badge}</span>}</div>
          <div className="dish-body">
            <div className="dish-title"><h3>{dish.name}</h3><strong>{dish.price.toLocaleString('hy-AM')} ֏</strong></div>
            <p>{dish.description}</p>
            <button className="add-button" disabled={!dish.available} onClick={() => addToCart({ ...dish, image: dish.localImage || dish.image })}>{dish.available ? 'Ավելացնել' : 'Սպառված է'} <Plus size={17} /></button>
          </div>
        </article>)}
      </div>
      <div className="menu-footer reveal"><p>Ճաշացանկում հասանելի է <strong>{totalProducts} ուտեստ</strong></p><a className="button button-dark" href="/menu/">Տեսնել ամբողջ մենյուն <ArrowRight size={17} /></a></div>
    </div>
  </section>
}

function Events() {
  return <section className="events-section" id="events">
    <div className="events-image reveal"><img src="/images/banquet-jano.webp" srcSet="/images/banquet-jano-mobile.webp 600w, /images/banquet-jano.webp 900w" sizes="(max-width: 820px) 100vw, 53vw" width="900" height="1125" alt="Տոնական սեղան Jano ռեստորանի սրահում" loading="lazy" /></div>
    <div className="events-copy reveal">
      <p className="eyebrow">Ձեր կարևոր օրերի համար</p>
      <h2>Տոնեք այնպես, ինչպես <em>կհիշեք</em></h2>
      <p>Ընտանեկան ընթրիքից մինչև մեծ միջոցառում՝ մենք հոգում ենք ճաշացանկի, սպասարկման և մթնոլորտի յուրաքանչյուր մանրուքը։</p>
      <ul>
        <li><Check /> Անհատական ճաշացանկ</li>
        <li><Check /> Բանկետային սրահ</li>
        <li><Check /> Արտագնա քեյթրինգ</li>
        <li><Check /> Մինչև 120 հյուր</li>
      </ul>
      <a className="button button-gold" href="/#reserve">Քննարկել միջոցառումը <ArrowRight size={17} /></a>
    </div>
  </section>
}

function Reservation({ shopInfo }) {
  const [sent, setSent] = useState(false)
  const submit = (event) => { event.preventDefault(); setSent(true); event.currentTarget.reset() }
  return <section className="section reservation-section" id="reserve">
    <div className="shell reservation-grid">
      <div className="reservation-copy reveal">
        <p className="eyebrow light">Ամրագրում</p>
        <h2>Ձեր սեղանը<br /><em>սպասում է</em></h2>
        <p>Թողեք տվյալները, և մեր թիմը կզանգահարի ամրագրումը հաստատելու համար։</p>
        <div className="contact-pills">
          <a href={`tel:${shopInfo.phoneHref}`}><Phone /><span><small>Զանգահարել</small><strong>{shopInfo.phoneDisplay}</strong></span></a>
          <div><Clock3 /><span><small>Ամեն օր</small><strong>10:00–00:00</strong></span></div>
        </div>
      </div>
      <form className="reservation-form reveal" onSubmit={submit}>
        <div className="form-head"><span>01</span><p>Լրացրեք տվյալները</p></div>
        <div className="field-row">
          <label><span>Անուն</span><input required name="name" autoComplete="name" placeholder="Ձեր անունը" /></label>
          <label><span>Հեռախոս</span><input required name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+374 __ ___ ___" /></label>
        </div>
        <div className="field-row">
          <label><span>Ամսաթիվ</span><input required name="date" type="date" /></label>
          <label><span>Ժամ</span><select required name="time" defaultValue=""><option value="" disabled>Ընտրել</option><option>12:00</option><option>14:00</option><option>18:00</option><option>20:00</option><option>22:00</option></select></label>
        </div>
        <label><span>Հյուրերի քանակ</span><select required name="guests" defaultValue="2"><option value="1">1 հյուր</option><option value="2">2 հյուր</option><option value="3">3 հյուր</option><option value="4">4 հյուր</option><option value="5">5–8 հյուր</option><option value="event">Միջոցառում</option></select></label>
        <button className="button button-gold form-submit" type="submit">Ուղարկել հարցումը <ArrowRight size={17} /></button>
        <p className="form-note">Ուղարկելով հարցումը՝ համաձայնում եք տվյալների մշակմանը։</p>
        {sent && <div className="success-message" role="status"><Check /> Շնորհակալություն։ Շուտով կկապվենք ձեզ հետ։</div>}
      </form>
    </div>
  </section>
}

const headerRoot = document.getElementById('home-header-root')
const contentRoot = document.getElementById('home-content-root')
const footerRoot = document.getElementById('home-footer-root')
const overlayRoot = document.getElementById('home-overlay-root')
const stateRoot = document.getElementById('home-state-root')

function HomeState() {
  const { cart, setCart, cartOpen, lastAdded, count, total, addToCart, openCart, closeCart } = useCartState()
  const { shopInfo, about, categories, products, featuredProductIds } = useShopData()
  const featuredProducts = useMemo(() => selectFeaturedProducts(products, featuredProductIds), [featuredProductIds, products])
  const featuredCategories = useMemo(() => categories.filter(category => featuredProducts.some(product => product.categoryId === category.id)), [categories, featuredProducts])
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: .12 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return <>
    {createPortal(<>
      <a className="skip-link" href="#main-content">Անցնել բովանդակությանը</a>
      <Header cartCount={count} onCart={openCart} shopInfo={shopInfo} />
    </>, headerRoot)}
    {createPortal(<>
      <Story about={about} />
      <MenuSection addToCart={addToCart} categories={featuredCategories} products={featuredProducts} totalProducts={products.length} />
      <Events />
      <Reservation shopInfo={shopInfo} />
    </>, contentRoot)}
    {createPortal(<Footer shopInfo={shopInfo} />, footerRoot)}
    {createPortal(<>
      <CartFeedback item={lastAdded} count={count} total={total} onOpen={openCart} />
      <CartDrawer items={cart} setItems={setCart} open={cartOpen} onClose={closeCart} shopInfo={shopInfo} />
    </>, overlayRoot)}
  </>
}

render(<HomeState />, stateRoot)
