# Vibe Cart (Frontend)

React + Vite + Tailwind frontend for Mock E-Com Cart.

## Features
- Products page with Add to Cart
- Cart page with qty update/remove and total
- Checkout with name/email validation, success modal (receipt ID)
- Loading skeletons and toast notifications
- Responsive layout

## Setup
```bash
cp .env.example .env # set VITE_API_URL (default http://localhost:5000)
npm install
npm run dev
```

## Scripts
- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run preview` – preview build
- `npm run lint` – eslint check

## Structure
- `src/pages` – Products, Cart, Checkout
- `src/context` – Cart context, toast bus
- `src/lib` – API helper
- `src/components` – Header, ToastHost

## Notes
- Cart hydrates from backend at app start.
- Add to Cart increments by 1; quantity controls on Cart page.
- Errors appear as toasts and inline field messages on checkout.
