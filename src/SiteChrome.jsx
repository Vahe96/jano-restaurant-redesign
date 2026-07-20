import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  ArrowRight, CalendarDays, Check, Clock3, Facebook, Instagram,
  MapPin, Menu, Minus, Phone, Plus, ShoppingBag, X
} from 'lucide-react'
import { fallbackShopInfo } from './useShopData.js'

const navItems = [
  ['Պատմություն', '/#story'], ['Մենյու', '/menu/'], ['Միջոցառումներ', '/#events'], ['Կապ', '/#contact']
]

export function Logo() {
  return <a className="logo" href="/">
    <span className="logo-mark" aria-hidden="true"><span>J</span></span>
    <span className="logo-copy"><strong>JANO</strong><small>RESTAURANT · 1946</small></span>
  </a>
}

export function Header({ cartCount, onCart, shopInfo = fallbackShopInfo }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])

  return <header className="site-header">
    <div className="header-inner shell">
      <Logo />
      <nav className="desktop-nav" aria-label="Հիմնական նավիգացիա">
        {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </nav>
      <div className="header-actions">
        <a className="header-phone" href={`tel:${shopInfo.phoneHref}`}><Phone size={16} /> <span>{shopInfo.phoneDisplay}</span></a>
        <button className="icon-button cart-button" onClick={onCart} aria-label={`Բացել զամբյուղը․ ${cartCount} ապրանք`}>
          <ShoppingBag size={20} /><span className="cart-count">{cartCount}</span>
        </button>
        <button className="icon-button menu-button" onClick={() => setOpen(true)} aria-label="Բացել մենյուն"><Menu size={22} /></button>
      </div>
    </div>
    {open && <div className="mobile-panel is-open" role="dialog" aria-modal="true" aria-label="Բջջային մենյու">
      <button className="icon-button panel-close" onClick={() => setOpen(false)} aria-label="Փակել մենյուն"><X /></button>
      <Logo />
      <nav aria-label="Բջջային նավիգացիա">
        {navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}<ArrowRight size={17} /></a>)}
      </nav>
      <a className="button button-gold" href="/#reserve" onClick={() => setOpen(false)}>Ամրագրել սեղան</a>
    </div>}
    {open && <button className="panel-scrim" onClick={() => setOpen(false)} aria-label="Փակել մենյուն" />}
  </header>
}

export function CartDrawer({ items, setItems, open, onClose, shopInfo = fallbackShopInfo }) {
  const drawerRef = useRef(null)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const update = (id, amount) => setItems(items.map(item => item.id === id ? { ...item, quantity: Math.max(0, item.quantity + amount) } : item).filter(item => item.quantity > 0))

  useEffect(() => {
    if (!open) return undefined
    const previousFocus = document.activeElement
    drawerRef.current?.querySelector('button')?.focus()
    const handleKey = event => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab') return
      const focusable = [...drawerRef.current.querySelectorAll('a[href], button:not([disabled])')]
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', handleKey)
    return () => { document.removeEventListener('keydown', handleKey); previousFocus?.focus?.() }
  }, [open, onClose])

  return <>
    <aside ref={drawerRef} className={`cart-drawer ${open ? 'is-open' : ''}`} aria-hidden={!open} inert={!open} role="dialog" aria-modal="true" aria-label="Զամբյուղ">
      <div className="drawer-head"><div><small>Ձեր պատվերը</small><h2>Զամբյուղ</h2></div><button className="icon-button" onClick={onClose} aria-label="Փակել զամբյուղը"><X /></button></div>
      <div className="drawer-items">
        {!items.length && <div className="empty-cart"><ShoppingBag /><h3>Զամբյուղը դատարկ է</h3><p>Ընտրեք որևէ ուտեստ մեր մենյուից։</p><a className="text-link" href="/menu/" onClick={onClose}>Դիտել մենյուն <ArrowRight size={17} /></a></div>}
        {items.map(item => <div className="cart-item" key={item.id}><img src={item.image} alt="" /><div><strong>{item.name}</strong><span>{item.price.toLocaleString('hy-AM')} ֏</span><div className="quantity"><button onClick={() => update(item.id, -1)} aria-label={`Պակասեցնել ${item.name}-ի քանակը`}><Minus /></button><span>{item.quantity}</span><button onClick={() => update(item.id, 1)} aria-label={`Ավելացնել ${item.name}-ի քանակը`}><Plus /></button></div></div></div>)}
      </div>
      {!!items.length && <div className="drawer-total"><div><span>Ընդամենը</span><strong>{total.toLocaleString('hy-AM')} ֏</strong></div><a className="button button-gold" href={`tel:${shopInfo.phoneHref}`}>Պատվիրել հեռախոսով <Phone size={17} /></a><small>Առաքման մանրամասները կհաստատվեն զանգով։</small></div>}
    </aside>
    {open && <button className="drawer-scrim" onClick={onClose} aria-label="Փակել զամբյուղը" />}
  </>
}

export function CartFeedback({ item, count, total, onOpen }) {
  return <>
    <div className={`cart-toast ${item ? 'is-visible' : ''}`} role="status" aria-live="polite">
      <Check size={17} /><span><strong>{item?.name || 'Ուտեստը'}</strong> ավելացվեց զամբյուղ</span>
    </div>
    {count > 0 && <button className="mobile-cart-bar" onClick={onOpen} aria-label={`Բացել զամբյուղը․ ${count} ապրանք, ${total.toLocaleString('hy-AM')} դրամ`}>
      <span><ShoppingBag size={18} /><i>{count}</i></span><strong>Դիտել զամբյուղը</strong><b>{total.toLocaleString('hy-AM')} ֏</b>
    </button>}
  </>
}

export function Footer({ shopInfo = fallbackShopInfo }) {
  const mapQuery = encodeURIComponent(shopInfo.address)
  return <footer id="contact">
    <div className="shell footer-top">
      <div className="footer-brand"><Logo /><p>Ընտանեկան բաղադրատոմսեր և ջերմ հյուրընկալություն՝ Երևանի սրտում, 1946 թվականից։</p><div className="socials"><a href="https://www.facebook.com" aria-label="Facebook"><Facebook /></a><a href="https://www.instagram.com" aria-label="Instagram"><Instagram /></a></div></div>
      <div><h3>Բացահայտել</h3>{navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}<a href="/#reserve">Ամրագրում</a></div>
      <div><h3>Կապ</h3><a href={`https://maps.google.com/?q=${mapQuery}`} target="_blank" rel="noreferrer"><MapPin /> {shopInfo.address}</a><a href={`tel:${shopInfo.phoneHref}`}><Phone /> {shopInfo.phoneDisplay}</a><a href={`mailto:${shopInfo.email}`}>{shopInfo.email}</a><span><Clock3 /> Ամեն օր՝ 10:00–00:00</span></div>
      <div className="footer-cta"><p>Պատրա՞ստ եք համտեսել</p><h3>Հանդիպենք Ճանոյում</h3><a className="button button-gold" href="/#reserve">Ամրագրել սեղան <CalendarDays size={17} /></a></div>
    </div>
    <div className="shell footer-bottom"><span>© 2026 Jano Restaurant</span><span>Ավանդույթը նոր համով · Երևան</span></div>
  </footer>
}

export function useCartState() {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('jano-cart') || '[]') } catch { return [] }
  })
  const [cartOpen, setCartOpen] = useState(false)
  const [lastAdded, setLastAdded] = useState(null)
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const addToCart = useCallback(dish => {
    setCart(current => current.some(item => item.id === dish.id)
      ? current.map(item => item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...current, { ...dish, quantity: 1 }])
    setLastAdded(dish)
  }, [])
  const openCart = useCallback(() => setCartOpen(true), [])
  const closeCart = useCallback(() => setCartOpen(false), [])

  useEffect(() => {
    document.body.classList.toggle('locked', cartOpen)
    return () => document.body.classList.remove('locked')
  }, [cartOpen])
  useEffect(() => { localStorage.setItem('jano-cart', JSON.stringify(cart)) }, [cart])
  useEffect(() => {
    if (!lastAdded) return undefined
    const timer = window.setTimeout(() => setLastAdded(null), 2200)
    return () => window.clearTimeout(timer)
  }, [lastAdded])

  return { cart, setCart, cartOpen, lastAdded, count, total, addToCart, openCart, closeCart }
}
