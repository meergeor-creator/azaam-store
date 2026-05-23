import React from 'react'
import HeroSlider from '../components/HeroSlider'
import ProductSection from '../components/ProductSection'
import { specialOffers, bestSellers, subscriptions, games } from '../data/products'

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
  return (
    <div className="home-page" dir="rtl">
      <HeroSlider items={introCards} />

      <section className="storefront-search" aria-label="البحث في المتجر">
        <label className="search-box storefront-search-box">
          <span className="search-icon" aria-hidden="true">⌕</span>
          <input className="search-input" placeholder="ابحث عن لعبة أو منتج رقمي..." />
        </label>
      </section>

      <ProductSection
        sectionId="special-offers"
        title="عروض خاصة"
        subtitle="عروض مركزة للاعبين مع مكافآت فورية"
        products={specialOffers}
      />

      <ProductSection
        sectionId="best-sellers"
        title="الأكثر مبيعاً"
        subtitle="ألعاب رياضية ومغامرات يطلبها اللاعبون"
        products={bestSellers}
      />

      <ProductSection
        sectionId="subscriptions"
        title="الاشتراكات"
        subtitle="خطط مستمرة بمزايا لعب متجددة"
        products={subscriptions}
      />

      <ProductSection
        sectionId="games"
        title="ألعاب"
        subtitle="مجموعة حديثة جاهزة للعب المباشر"
        products={games}
      />
    </div>
  )
}
