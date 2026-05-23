import React from 'react'

export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="header" dir="rtl">
      <div className="header-container">
        <div className="header-left">
          <img src="https://via.placeholder.com/40" alt="avatar" className="avatar" />
          <button className="icon-btn lang-btn" aria-label="تغيير اللغة">ع</button>
          <button className="icon-btn theme-toggle" onClick={onToggleTheme} aria-label="تبديل الثيم">
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
