import React from 'react'
import { render } from 'preact'
import { createPortal } from 'react-dom'
import './styles.css'
import BoxPage from './BoxPage.jsx'
import { CartDrawer, CartFeedback, Footer, Header, useCartState } from './SiteChrome.jsx'
import { useShopData } from './useShopData.js'

document.documentElement.dataset.stylesReady = ''

const headerRoot = document.getElementById('box-header-root')
const contentRoot = document.getElementById('box-content-root')
const footerRoot = document.getElementById('box-footer-root')
const overlayRoot = document.getElementById('box-overlay-root')
const stateRoot = document.getElementById('box-state-root')

function BoxState() {
  const { cart, setCart, cartOpen, lastAdded, count, total, addToCart, openCart, closeCart } = useCartState()
  const { shopInfo, products, collections, status } = useShopData()

  return <>
    {createPortal(<>
      <a className="skip-link" href="#main-content">Անցնել բովանդակությանը</a>
      <Header cartCount={count} onCart={openCart} shopInfo={shopInfo} />
    </>, headerRoot)}
    {createPortal(<BoxPage collections={collections} products={products} status={status} shopInfo={shopInfo} addToCart={addToCart} />, contentRoot)}
    {createPortal(<Footer shopInfo={shopInfo} />, footerRoot)}
    {createPortal(<>
      <CartFeedback item={lastAdded} count={count} total={total} onOpen={openCart} />
      <CartDrawer items={cart} setItems={setCart} open={cartOpen} onClose={closeCart} shopInfo={shopInfo} />
    </>, overlayRoot)}
  </>
}

render(<BoxState />, stateRoot)
