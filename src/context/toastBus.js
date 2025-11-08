class ToastBus {
  listeners = new Set();
  subscribe(fn) { this.listeners.add(fn); }
  unsubscribe(fn) { this.listeners.delete(fn); }
  success(message) { this.emit({ type: 'success', message }); }
  error(message) { this.emit({ type: 'error', message }); }
  emit(toast) { this.listeners.forEach(fn => fn(toast)); }
}

export const toastBus = new ToastBus();
