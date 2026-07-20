import React from 'react'
import { render } from 'preact'
import { createPortal } from 'react-dom'
import './styles.css'
import { MenuContent } from './MenuPage.jsx'
import { CartDrawer, CartFeedback, Footer, Header, useCartState } from './SiteChrome.jsx'
import { useShopData } from './useShopData.js'

document.documentElement.dataset.stylesReady = ''

const headerRoot = document.getElementById('menu-header-root')
const contentRoot = document.getElementById('menu-content-root')
const footerRoot = document.getElementById('menu-footer-root')
const overlayRoot = document.getElementById('menu-overlay-root')
const stateRoot = document.getElementById('menu-state-root')

function MenuState() {
  const { cart, setCart, cartOpen, lastAdded, count, total, addToCart, openCart, closeCart } = useCartState()
  const { shopInfo, categories, products, collections, status } = useShopData()

  return <>
    {createPortal(<>
      <a className="skip-link" href="#main-content">Անցնել բովանդակությանը</a>
      <Header cartCount={count} onCart={openCart} shopInfo={shopInfo} />
    </>, headerRoot)}
    {createPortal(<MenuContent addToCart={addToCart} categories={categories} products={products} collections={collections} status={status} shopInfo={shopInfo} />, contentRoot)}
    {createPortal(<Footer shopInfo={shopInfo} />, footerRoot)}
    {createPortal(<>
      <CartFeedback item={lastAdded} count={count} total={total} onOpen={openCart} />
      <CartDrawer items={cart} setItems={setCart} open={cartOpen} onClose={closeCart} shopInfo={shopInfo} />
    </>, overlayRoot)}
  </>
}

render(<MenuState />, stateRoot)
