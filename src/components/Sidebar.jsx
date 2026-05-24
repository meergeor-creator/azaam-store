import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const FAVORITES_HINT_EVENT = 'azzamStoreFavoritesHint'

const navItems = [
  { label: 'الرئيسية', icon: '⌂', path: '/' },
  { label: 'المتجر', icon: '▣', path: '/' },
  { label: 'المفضلة', icon: '♡', action: 'favorites' },
  { label: 'طلباتي', icon: '▤', path: '/orders' },
  { label: 'المحفظة', icon: '□', path: '/' },
  { label: 'الإضافة', icon: '+', path: '/' },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const isActive = (item) => {
    if (!item.path) return false
    if (item.path === '/') return location.pathname === '/' && item.label === 'الرئيسية'
    return location.pathname === item.path
  }

  const handleFavoritesNav = () => {
    navigate('/')

    window.setTimeout(() => {
      const favoritesSection = document.getElementById('favorites')
      const fallbackSection = document.getElementById('special-offers')

      if (favoritesSection) {
        favoritesSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }

      fallbackSection?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.dispatchEvent(new Event(FAVORITES_HINT_EVENT))
    }, 80)
  }

  const handleNav = (item) => {
    if (item.action === 'favorites') {
      handleFavoritesNav()
      return
    }

    navigate(item.path)
  }

  return (
    <aside className="sidebar" dir="rtl">
      <div className="sidebar-logo">
        <div className="logo-icon" aria-hidden="true">A</div>
        <div className="logo-text">Azzam Store</div>
      </div>

      <nav className="sidebar-nav" aria-label="القائمة الرئيسية">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`nav-link${isActive(item) ? ' active' : ''}`}
            onClick={() => handleNav(item)}
            type="button"
          >
            <span className="nav-icon" aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="settings-link" type="button">
          <span className="nav-icon" aria-hidden="true">⚙</span>
          <span>الإعدادات</span>
        </button>
      </div>
    </aside>
  )
}
