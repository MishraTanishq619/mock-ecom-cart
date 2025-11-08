import React from 'react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { items, loading, total, update, remove } = useCart();

  if (loading) {
    return (
      <div>
        <h1 className="mb-6 text-xl font-semibold">Your Cart</h1>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="card">
              <div className="h-4 w-1/2 skeleton mb-2" />
              <div className="h-3 w-1/3 skeleton" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!items.length) {
    return <div className="text-center mt-10">Your cart is empty.</div>;
  }

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold">Your Cart</h1>
      <div className="space-y-4">
        {items.map(i => (
          <div key={i.productId} className="card flex items-start justify-between gap-4">
            <div>
              <div className="font-medium">{i.name}</div>
              <div className="text-sm text-gray-600">₹ {i.price.toFixed(2)} each</div>
              <div className="text-sm text-gray-600">Stock: {i.stock}</div>
            </div>
            <div className="flex items-center gap-2">
              <input type="number" className="input w-24" min={1} max={i.stock} value={i.qty}
                onChange={(e) => {
                  const val = Math.max(1, Math.min(i.stock, parseInt(e.target.value || '1', 10)));
                  update(i.productId, val);
                }} />
              <button className="btn-outline" onClick={() => remove(i.productId)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-lg font-semibold">Total: ₹ {total.toFixed(2)}</div>
        <a href="/checkout" className="btn">Checkout</a>
      </div>
    </div>
  );
}
