import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { toastBus } from './toastBus';
import { api } from '../lib/api';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // { productId, name, price, description, stock, qty, lineTotal }
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.get('/cart');
      setItems(data.items || []);
    } catch (e) {
      toastBus.error(e.message || 'Failed to load cart');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  async function add(productId) {
    try {
      await api.post('/cart', { productId, qty: 1 });
      toastBus.success('Added to cart');
      refresh();
    } catch (e) {
      toastBus.error(e.message);
    }
  }

  async function update(productId, qty) {
    try {
      await api.put(`/cart/${productId}`, { qty });
      toastBus.success('Quantity updated');
      refresh();
    } catch (e) {
      toastBus.error(e.message);
    }
  }

  async function remove(productId) {
    try {
      await api.del(`/cart/${productId}`);
      toastBus.success('Item removed');
      refresh();
    } catch (e) {
      toastBus.error(e.message);
    }
  }

  const total = items.reduce((n, i) => n + i.lineTotal, 0);

  return (
    <CartContext.Provider value={{ items, loading, total, add, update, remove, refresh }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
