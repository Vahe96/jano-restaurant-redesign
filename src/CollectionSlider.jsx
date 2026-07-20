import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import CollectionCard from './CollectionCard.jsx'

export default function CollectionSlider({ collections, compact = false, label = 'Jano box-եր' }) {
  const trackRef = useRef(null)
  const [position, setPosition] = useState({ start: true, end: false })

  const updatePosition = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth)
    setPosition({ start: track.scrollLeft <= 3, end: track.scrollLeft >= maxScroll - 3 })
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined
    updatePosition()
    const resize = 'ResizeObserver' in window ? new ResizeObserver(updatePosition) : null
    resize?.observe(track)
    track.addEventListener('scroll', updatePosition, { passive: true })
    return () => {
      resize?.disconnect()
      track.removeEventListener('scroll', updatePosition)
    }
  }, [collections.length, updatePosition])

  const move = direction => {
    const track = trackRef.current
    if (!track) return
    const slide = track.querySelector('.collection-slide')
    const distance = slide ? slide.getBoundingClientRect().width + 22 : track.clientWidth * .82
    track.scrollBy({ left: direction * distance, behavior: 'smooth' })
  }

  return <div className="collection-slider-frame">
    <div ref={trackRef} className="collection-slider" aria-label={label}>
      {collections.map(collection => <div className="collection-slide" key={collection.id}>
        <CollectionCard collection={collection} compact={compact} />
      </div>)}
    </div>
    <div className="collection-slider-controls" aria-label="Բոքսերի սլայդերի կառավարում">
      <button type="button" onClick={() => move(-1)} disabled={position.start} aria-label="Նախորդ բոքսը"><ArrowLeft /></button>
      <span aria-hidden="true"><i className={position.start ? 'is-active' : ''} /><i className={!position.start && !position.end ? 'is-active' : ''} /><i className={position.end ? 'is-active' : ''} /></span>
      <button type="button" onClick={() => move(1)} disabled={position.end} aria-label="Հաջորդ բոքսը"><ArrowRight /></button>
    </div>
  </div>
}
