import React from 'react'

const navItems = [
  { label: 'الرئيسية', icon: '⌂', active: true },
  { label: 'المتجر', icon: '🛒' },
  { label: 'المحفظة', icon: '▣' },
  { label: 'الإضافة', icon: '+' },
]

export default function Sidebar() {
  return (
    <aside className="sidebar" dir="rtl">
      <div className="sidebar-logo">
        <div className="logo-icon" aria-hidden="true">A</div>
        <div className="logo-text">Azzam Store</div>
      </div>

      <nav className="sidebar-nav" aria-label="القائمة الرئيسية">
        {navItems.map((item) => (
          <button key={item.label} className={`nav-link${item.active ? ' active' : ''}`}>
            <span className="nav-icon" aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="settings-link">
          <span className="nav-icon" aria-hidden="true">⚙</span>
          <span>الإعدادات</span>
        </button>
      </div>
    </aside>
  )
}
