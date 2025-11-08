import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import Header from './components/Header';
import ToastHost from './components/ToastHost';
import { CartProvider } from './context/CartContext';

export default function App() {
  return (
    <CartProvider>
      <Header />
      <ToastHost />
      <div className="container py-6">
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="*" element={<div className='mt-10 text-center'>Page not found</div>} />
        </Routes>
      </div>
    </CartProvider>
  );
}
