import React, { useEffect, useMemo, useRef, useState } from 'react'
import HeroSlider from '../components/HeroSlider'
import ProductSection from '../components/ProductSection'
import { mergedProducts, productsByCategory } from '../data/productCatalog'
import { useFavorites } from '../hooks/useFavorites'

const introCards = [
  {
    id: 'intro-fast',
    title: 'شحن سريع',
    subtitle: 'استلام المنتجات الرقمية بسرعة وبخطوات واضحة.',
    tag: 'فوري',
    accent: '#82c99a',
  },
  {
    id: 'intro-prices',
    title: 'أسعار مميزة',
    subtitle: 'عروض مختارة وتجربة شراء مناسبة للاعبين.',
    tag: 'وفر أكثر',
    accent: '#7db7c9',
  },
  {
    id: 'intro-support',
    title: 'دعم مباشر',
    subtitle: 'مساعدة قريبة عند الطلب قبل وبعد الشراء.',
    tag: 'متوفر',
    accent: '#9acb8f',
  },
  {
    id: 'intro-digital',
    title: 'منتجات رقمية متنوعة',
    subtitle: 'ألعاب، اشتراكات، بطاقات وخدمات رقمية في مكان واحد.',
    tag: 'متنوع',
    accent: '#86b7d7',
  },
]

export default function Home() {
  const { favoriteSet } = useFavorites()
  const [showFavoritesHint, setShowFavoritesHint] = useState(false)
  const favoriteProducts = useMemo(
    () => mergedProducts.filter((product) => favoriteSet.has(product.id)),
    [favoriteSet],
  )
  const [visibleFavoriteProducts, setVisibleFavoriteProducts] = useState(() => favoriteProducts)
  const [exitingFavoriteIds, setExitingFavoriteIds] = useState(() => new Set())
  const exitTimersRef = useRef([])

  useEffect(() => {
    const showHint = () => {
      setShowFavoritesHint(true)
      window.setTimeout(() => setShowFavoritesHint(false), 2200)
    }

    window.addEventListener('azzamStoreFavoritesHint', showHint)
    return () => window.removeEventListener('azzamStoreFavoritesHint', showHint)
  }, [])

  useEffect(() => {
    return () => {
      exitTimersRef.current.forEach((timer) => window.clearTimeout(timer))
    }
  }, [])

  useEffect(() => {
    const favoriteIds = new Set(favoriteProducts.map((product) => product.id))

    setVisibleFavoriteProducts((currentProducts) => {
      const currentIds = new Set(currentProducts.map((product) => product.id))
      const removedProducts = currentProducts.filter((product) => !favoriteIds.has(product.id))
      const addedProducts = favoriteProducts.filter((product) => !currentIds.has(product.id))

      if (removedProducts.length > 0) {
        const removedIds = removedProducts.map((product) => product.id)

        setExitingFavoriteIds((current) => new Set([...current, ...removedIds]))

        const timer = window.setTimeout(() => {
          setVisibleFavoriteProducts((latestProducts) => latestProducts.filter((product) => favoriteIds.has(product.id)))
          setExitingFavoriteIds((current) => {
            const next = new Set(current)
            removedIds.forEach((id) => next.delete(id))
            return next
          })
        }, 460)

        exitTimersRef.current.push(timer)
      }

      if (addedProducts.length === 0) return currentProducts
      return [...currentProducts, ...addedProducts]
    })
  }, [favoriteProducts])

  const favoriteSectionProducts = visibleFavoriteProducts.map((product) => ({
    ...product,
    favoriteExiting: exitingFavoriteIds.has(product.id),
  }))

  return (
    <div className="home-page" dir="rtl">
      <HeroSlider items={introCards} />

      <section className="storefront-search" aria-label="البحث في المتجر">
        <label className="search-box storefront-search-box">
          <span className="search-icon" aria-hidden="true">⌕</span>
          <input className="search-input" placeholder="ابحث عن لعبة أو منتج رقمي..." />
        </label>
      </section>

      {visibleFavoriteProducts.length > 0 && (
        <ProductSection
          sectionId="favorites"
          className="favorites-section"
          title="المفضلة"
          products={favoriteSectionProducts}
        />
      )}

      {showFavoritesHint && (
        <div className="favorites-hint" role="status">
          لا توجد منتجات مفضلة بعد
        </div>
      )}

      <ProductSection
        sectionId="special-offers"
        title="عروض خاصة"
        subtitle="عروض مركزة للاعبين مع مكافآت فورية"
        products={productsByCategory['special-offers'] || []}
      />

      <ProductSection
        sectionId="best-sellers"
        title="الأكثر مبيعاً"
        subtitle="ألعاب رياضية ومغامرات يطلبها اللاعبون"
        products={productsByCategory['best-sellers'] || []}
      />

      <ProductSection
        sectionId="subscriptions"
        title="الاشتراكات"
        subtitle="خطط مستمرة بمزايا لعب متجددة"
        products={productsByCategory.subscriptions || []}
      />

      <ProductSection
        sectionId="games"
        title="ألعاب"
        subtitle="مجموعة حديثة جاهزة للعب المباشر"
        products={productsByCategory.games || []}
      />
    </div>
  )
}
