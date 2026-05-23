import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/global.css'

document.documentElement.lang = 'ar'
document.documentElement.dir = 'rtl'

const root = createRoot(document.getElementById('root'))
root.render(<App />)
