import React from 'react'

export default function ProductCard({ title, subtitle, price, badge, accent }) {
  const cardAccent = accent || '#60be7d'

  return (
    <article className="product-card">
      <div
        className="product-card-visual"
        style={{
          '--product-accent': cardAccent,
          background: `linear-gradient(135deg, ${cardAccent} 0%, rgba(8,12,22,0.92) 72%)`,
        }}
      >
        {badge ? <span className="product-badge">{badge}</span> : price ? <span className="product-price">{price}</span> : null}
      </div>

      <div className="product-card-body">
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
    </article>
  )
}
