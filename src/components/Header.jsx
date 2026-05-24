import React, { useLayoutEffect, useState } from 'react'

const getStoredTheme = () => localStorage.getItem('theme') || 'dark'

export default function Header() {
  const [theme, setTheme] = useState(getStoredTheme)

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'

    document.documentElement.setAttribute('data-theme', nextTheme)
    localStorage.setItem('theme', nextTheme)
    setTheme(nextTheme)
  }

  return (
    <header className="header" dir="rtl">
      <div className="header-container">
        <div className="header-left">
          <img src="https://via.placeholder.com/40" alt="avatar" className="avatar" />
          <button className="icon-btn lang-btn" aria-label="تغيير اللغة">ع</button>
          <button className="icon-btn theme-toggle" onClick={toggleTheme} aria-label="تبديل الثيم">
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <button className="icon-btn" aria-label="المفضلة">♡</button>
        </div>

        <div className="header-center" aria-hidden="true">
          <span>متجر الألعاب</span>
        </div>

        <div className="header-right">
          <button className="auth-btn">تسجيل دخول</button>
          <button className="auth-btn signup">إنشاء حساب</button>
        </div>
      </div>
    </header>
  )
}
