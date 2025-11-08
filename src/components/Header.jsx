import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { items } = useCart();
  const count = items.reduce((n, i) => n + i.qty, 0);
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container flex h-14 items-center justify-between">
        <Link to="/" className="text-lg font-semibold">Vibe Cart</Link>
        <nav className="flex items-center gap-4 text-sm">
          <NavLink to="/" className={({isActive}) => isActive ? 'text-blue-600' : 'text-gray-600'}>Products</NavLink>
          <NavLink to="/cart" className={({isActive}) => isActive ? 'text-blue-600' : 'text-gray-600'}>
            Cart ({count})
          </NavLink>
          <NavLink to="/checkout" className={({isActive}) => isActive ? 'text-blue-600' : 'text-gray-600'}>Checkout</NavLink>
          <NavLink to="/orders" className={({isActive}) => isActive ? 'text-blue-600' : 'text-gray-600'}>Orders</NavLink>
        </nav>
      </div>
    </header>
  );
}
