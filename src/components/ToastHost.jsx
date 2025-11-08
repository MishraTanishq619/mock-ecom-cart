import React, { useEffect, useState } from 'react';
import { toastBus } from '../context/toastBus';

export default function ToastHost() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    function handler(toast) {
      setToasts(t => [...t, { id: Date.now() + Math.random(), ...toast }]);
    }
    toastBus.subscribe(handler);
    return () => toastBus.unsubscribe(handler);
  }, []);

  useEffect(() => {
    if (!toasts.length) return;
    const timers = toasts.map(t => setTimeout(() => {
      setToasts(ts => ts.filter(x => x.id !== t.id));
    }, 3000));
    return () => timers.forEach(clearTimeout);
  }, [toasts]);

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map(t => (
        <div key={t.id} className={`rounded-md px-4 py-2 shadow-md text-sm text-white ${t.type === 'error' ? 'bg-red-600' : 'bg-green-600'}`}>{t.message}</div>
      ))}
    </div>
  );
}
