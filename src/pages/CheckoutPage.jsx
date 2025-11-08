import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { api } from '../lib/api';
import { toastBus } from '../context/toastBus';
import { Link } from 'react-router-dom';

export default function CheckoutPage() {
  const { items, total, refresh } = useCart();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [receiptId, setReceiptId] = useState(null);

  const validate = () => {
    const errs = {};
    if (name.trim().length < 3) errs.name = 'Name must be at least 3 characters';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errs.email = 'Invalid email';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  async function submit(e) {
    e.preventDefault();
    if (!validate()) return;
    if (!items.length) { toastBus.error('Cart is empty'); return; }
    setSubmitting(true);
    try {
      const { receiptId } = await api.post('/checkout', { name, email });
      setReceiptId(receiptId);
      toastBus.success('Checkout complete');
      refresh();
    } catch (e) {
      toastBus.error(e.message);
    } finally { setSubmitting(false); }
  }

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold">Checkout</h1>
      <form onSubmit={submit} className="max-w-md space-y-4">
        <div>
          <label className="label" htmlFor="name">Name</label>
          <input id="name" className="input" value={name} onChange={e => setName(e.target.value)} onBlur={validate} />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>
        <div>
          <label className="label" htmlFor="email">Email</label>
            <input id="email" className="input" value={email} onChange={e => setEmail(e.target.value)} onBlur={validate} />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div className="text-sm text-gray-600">Items: {items.length} | Total: ₹ {total.toFixed(2)}</div>
        <button disabled={submitting} className="btn w-full" type="submit">{submitting ? 'Processing...' : 'Place Order'}</button>
      </form>

      {receiptId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 p-4">
          <div className="card max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold mb-2">Order Successful</h2>
            <p className="text-sm mb-4">Receipt ID: <span className="font-mono text-xs">{receiptId}</span></p>
            <Link to="/" className="btn w-full">Back to Products</Link>
          </div>
        </div>
      )}
    </div>
  );
}
