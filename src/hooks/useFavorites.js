import { useEffect, useMemo, useState } from 'react'

const FAVORITES_KEY = 'azzamStoreFavorites'
const FAVORITES_EVENT = 'azzamStoreFavoritesChanged'

const readFavorites = () => {
  try {
    const value = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || []
    return Array.isArray(value) ? value : []
  } catch {
    return []
  }
}

const writeFavorites = (favoriteIds) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds))
  window.dispatchEvent(new Event(FAVORITES_EVENT))
}

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState(readFavorites)

  useEffect(() => {
    const syncFavorites = () => setFavoriteIds(readFavorites())

    window.addEventListener(FAVORITES_EVENT, syncFavorites)
    window.addEventListener('storage', syncFavorites)

    return () => {
      window.removeEventListener(FAVORITES_EVENT, syncFavorites)
      window.removeEventListener('storage', syncFavorites)
    }
  }, [])

  const favoriteSet = useMemo(() => new Set(favoriteIds), [favoriteIds])

  const isFavorite = (productId) => favoriteSet.has(productId)

  const toggleFavorite = (productId) => {
    const nextFavorites = favoriteSet.has(productId)
      ? favoriteIds.filter((id) => id !== productId)
      : [...favoriteIds, productId]

    writeFavorites(nextFavorites)
    setFavoriteIds(nextFavorites)
  }

  return {
    favoriteIds,
    favoriteSet,
    isFavorite,
    toggleFavorite,
  }
}
