import React, { useEffect, useRef, useState } from 'react'

export default function HeroSlider({ items }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const dragStartRef = useRef(null)

  const goTo = (index) => {
    const nextIndex = (index + items.length) % items.length
    setActiveIndex(nextIndex)
  }

  const goNext = () => goTo(activeIndex + 1)
  const goPrev = () => goTo(activeIndex - 1)

  useEffect(() => {
    if (isPaused || items.length < 2) return undefined

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length)
    }, 1800)

    return () => window.clearInterval(interval)
  }, [isPaused, items.length])

  const getPosition = (index) => {
    const total = items.length
    const raw = (index - activeIndex + total) % total

    if (raw === 0) return 'active'
    if (raw === 1) return 'next'
    if (raw === total - 1) return 'prev'
    if (raw === 2) return 'far-next'
    if (raw === total - 2) return 'far-prev'
    return 'hidden'
  }

  const handlePointerDown = (event) => {
    dragStartRef.current = event.clientX
  }

  const handlePointerUp = (event) => {
    if (dragStartRef.current === null) return

    const delta = event.clientX - dragStartRef.current
    dragStartRef.current = null

    if (Math.abs(delta) < 42) return
    if (delta > 0) goPrev()
    else goNext()
  }

  return (
    <section className="hero-slider">
      <div className="section-header hero-slider-header">
        <div>
          <h2>مزايا Azzam Store</h2>
          <p>تجربة متجر رقمية سريعة وواضحة للاعبين.</p>
        </div>
      </div>

      <div
        className="hero-stage"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          dragStartRef.current = null
        }}
      >
        <button type="button" className="hero-nav hero-nav-prev" onClick={goPrev} aria-label="السابق">
          ‹
        </button>

        <div className="hero-coverflow" aria-live="polite">
          {items.map((item, index) => {
            const position = getPosition(index)
            const isActive = position === 'active'

            return (
              <article
                key={item.id}
                className="hero-card"
                data-position={position}
                aria-hidden={position === 'hidden'}
                onClick={() => {
                  if (!isActive) goTo(index)
                }}
                style={{ '--hero-accent': item.accent }}
              >
                <div className="hero-badge" style={{ background: item.accent }}>
                  {item.tag || 'ميزة'}
                </div>
                <div className="hero-copy">
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </div>
                <div className="hero-placeholder" />
              </article>
            )
          })}
        </div>

        <button type="button" className="hero-nav hero-nav-next" onClick={goNext} aria-label="التالي">
          ›
        </button>
      </div>

      <div className="hero-dots" aria-label="مؤشر المزايا">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={`hero-dot${index === activeIndex ? ' active' : ''}`}
            onClick={() => goTo(index)}
            aria-label={`ميزة ${index + 1}`}
            aria-current={index === activeIndex ? 'true' : undefined}
          />
        ))}
      </div>
    </section>
  )
}
