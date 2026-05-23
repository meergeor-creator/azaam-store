import React, { useRef } from 'react'
import ProductCard from './ProductCard'

export default function ProductSection({ title, subtitle, products, sectionId }) {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: direction === 'left' ? -260 : 260, behavior: 'smooth' })
  }

  return (
    <section className="product-section" id={sectionId}>
      <div className="section-header">
        <div className="section-title">
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>

        <div className="section-actions">
          <a className="view-all-link" href={`#${sectionId}`}>عرض الجميع</a>
          <button type="button" className="scroll-btn" onClick={() => scroll('left')} aria-label="السابق">
            ‹
          </button>
          <button type="button" className="scroll-btn" onClick={() => scroll('right')} aria-label="التالي">
            ›
          </button>
        </div>
      </div>

      <div className="product-row" ref={scrollRef}>
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  )
}
