import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useCart } from '../context/CartContext';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { add } = useCart();

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      try {
        const data = await api.get('/products');
        if (active) setProducts(data);
      } catch (e) {
        // handled by toast in api usage if needed
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => { active = false; };
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card">
            <div className="h-4 w-1/2 skeleton mb-3" />
            <div className="h-3 w-1/3 skeleton mb-2" />
            <div className="h-24 skeleton mb-4" />
            <div className="h-9 skeleton" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold">Products</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map(p => (
          <div key={p._id} className="card flex flex-col">
            <h2 className="font-medium mb-1">{p.name}</h2>
            <div className="text-sm text-gray-600 mb-2">₹ {p.price.toFixed(2)}</div>
            <p className="text-sm flex-1 mb-4 overflow-hidden">{p.description}</p>
            <button className="btn" disabled={p.stock <= 0} onClick={() => add(p._id)}>
              {p.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
