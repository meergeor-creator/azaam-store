import React, { useLayoutEffect, useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <div className="app">
      <main className="main-content">
        <Header theme={theme} onToggleTheme={toggleTheme} />

        <div className="page-wrapper">
          <Home />
        </div>
      </main>

      <Sidebar />
    </div>
  )
}
