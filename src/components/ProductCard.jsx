import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFavorites } from '../hooks/useFavorites'

export default function ProductCard({
  id,
  slug,
  title,
  displayName,
  subtitle,
  subCategory,
  price,
  priceLabel,
  formattedPrice,
  badge,
  accent,
  gradient,
  image,
  favoriteExiting = false,
}) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const [favoritePulse, setFavoritePulse] = useState(false)
  const cardAccent = accent || '#60be7d'
  const cardTitle = displayName || title
  const cardSubtitle = subtitle || subCategory
  const cardPrice = priceLabel || formattedPrice || price
  const productId = id || slug
  const favorite = isFavorite(productId)
  const visualStyle = {
    '--product-accent': cardAccent,
    background: gradient || `linear-gradient(135deg, ${cardAccent} 0%, rgba(8,12,22,0.92) 72%)`,
  }

  if (image) {
    visualStyle.backgroundImage = `linear-gradient(135deg, rgba(8,12,22,0.18), rgba(8,12,22,0.78)), url(${image})`
    visualStyle.backgroundSize = 'cover'
    visualStyle.backgroundPosition = 'center'
  }

  return (
    <article className={`product-card${favoriteExiting ? ' favorite-exiting' : ''}`}>
      <button
        type="button"
        className={`favorite-toggle${favorite ? ' active' : ''}${favoritePulse ? ' pulse' : ''}`}
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          setFavoritePulse(false)
          window.setTimeout(() => setFavoritePulse(true), 0)
          window.setTimeout(() => setFavoritePulse(false), 240)
          toggleFavorite(productId)
        }}
        aria-label={favorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
        aria-pressed={favorite}
      >
        <span aria-hidden="true">♡</span>
      </button>

      <Link className="product-card-main" to={`/product/${slug}`} aria-label={cardTitle}>
        <div className="product-card-visual" style={visualStyle}>
          {badge ? <span className="product-badge">{badge}</span> : cardPrice ? <span className="product-price">{cardPrice}</span> : null}
        </div>

        <div className="product-card-body">
          <h3>{cardTitle}</h3>
          <p>{cardSubtitle}</p>
        </div>
      </Link>
    </article>
  )
}
