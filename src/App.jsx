import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Orders from './pages/Orders'
import ProductDetails from './pages/ProductDetails'

export default function App() {
  return (
    <div className="app">
      <main className="main-content">
        <Header />

        <div className="page-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:slug" element={<ProductDetails />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </main>

      <Sidebar />
    </div>
  )
}
