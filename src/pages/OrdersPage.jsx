import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';

function formatDate(ts) {
  return new Date(ts).toLocaleString(undefined, {
    year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'
  });
}

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(null); // receipt id

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      try {
        const data = await api.get('/receipts');
        if (active) setOrders(data.data || []);
      } catch (e) {
        setError(e.message);
      } finally { if (active) setLoading(false); }
    }
    load();
    return () => { active = false; };
  }, []);

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="card">
            <div className="h-4 w-1/3 skeleton mb-2" />
            <div className="h-3 w-1/2 skeleton" />
          </div>
        ))}
      </div>
    );
  }

  if (error) return <div className="text-red-600">{error}</div>;

  if (!orders.length) return <div className="text-center mt-10">No past orders yet. <a href="/" className="text-blue-600 underline">Browse products</a></div>;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Past Orders</h1>
      {orders.map(o => {
        const isOpen = expanded === o._id;
        return (
          <div key={o._id} className="card">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Receipt #{o._id}</div>
                <div className="text-xs text-gray-500">{formatDate(o.createdAt)}</div>
              </div>
              <div className="text-sm font-semibold">₹ {o.total.toFixed(2)}</div>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <div className="text-gray-600">{o.items.length} items</div>
              <button className="btn-outline" onClick={() => setExpanded(isOpen ? null : o._id)}>{isOpen ? 'Hide' : 'Details'}</button>
            </div>
            {isOpen && (
              <div className="mt-4 space-y-2">
                {o.items.map(it => (
                  <div key={it.productId + it.name} className="flex justify-between text-xs">
                    <div className="flex-1">
                      <div className="font-medium">{it.name}</div>
                      <div className="text-gray-600">₹ {it.price.toFixed(2)} × {it.qty}</div>
                    </div>
                    <div className="text-gray-800 font-semibold">₹ {(it.price * it.qty).toFixed(2)}</div>
                  </div>
                ))}
                <div className="pt-2 border-t border-gray-200 flex justify-between text-sm font-semibold">
                  <span>Total</span>
                  <span>₹ {o.total.toFixed(2)}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">Buyer: {o.buyerName} ({o.buyerEmail})</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
