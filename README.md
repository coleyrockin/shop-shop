# Shop-Shop

[![CI](https://github.com/coleyrockin/shop-shop/actions/workflows/ci.yml/badge.svg)](https://github.com/coleyrockin/shop-shop/actions/workflows/ci.yml)
![Stack](https://img.shields.io/badge/stack-MERN-339933?style=flat&logo=node.js&logoColor=white)
![GraphQL](https://img.shields.io/badge/API-GraphQL-E10098?style=flat&logo=graphql&logoColor=white)
![Stripe](https://img.shields.io/badge/Payments-Stripe-635BFF?style=flat&logo=stripe&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue?style=flat)

A small e-commerce demo built on the MERN stack with GraphQL (Apollo), JWT auth, Stripe Checkout, and an offline-capable shopping cart backed by IndexedDB.

This project started as a bootcamp exercise. It has since been hardened, refactored, and documented as a portfolio piece — see [`SECURITY_AUDIT.md`](./SECURITY_AUDIT.md) for the upgrades that have been applied.

## Live demo

> _Live demo coming soon._

## Screenshots

> _Screenshots coming soon. Add captures of the home page, product detail, and checkout success to `assets/`._

## Features

- Browse products by category
- Product detail page with add/remove from cart
- Persistent cart state via IndexedDB (survives reload, works offline)
- Sign up / log in (JWT, bcrypt-hashed passwords)
- Stripe Checkout redirect with server-side price + quantity validation
- Order history per user
- Server-trusted Stripe session verification before order creation
- Mongoose `sanitizeFilter`, body-size limits, and security headers on the API

## Tech stack

| Layer | Tech |
|---|---|
| Front end | React 16, Apollo Client 3, React Router 6, IndexedDB |
| Back end | Node.js, Express, Apollo Server (express) 3, Mongoose 6 |
| Database | MongoDB |
| Auth | JSON Web Tokens, bcrypt |
| Payments | Stripe Checkout |
| Build | Create React App (react-scripts 5) |
| Tooling | ESLint 9, Prettier 3, GitHub Actions |

## Architecture

```
┌──────────┐  GraphQL   ┌─────────────────┐
│  React   │ ─────────► │ Apollo Server   │
│  Client  │ ◄───────── │ (Express)       │
└──────────┘            └────────┬────────┘
     │                           │ Mongoose
     │                           ▼
     │                  ┌──────────────────┐
     │                  │     MongoDB      │
     │                  └──────────────────┘
     │  redirect
     ▼
┌──────────────────┐    server-side session verification on success
│ Stripe Checkout  │ ─────────────────────────────────────────► server
└──────────────────┘
```

## Getting started

### Prerequisites

- Node.js 20+
- A running MongoDB instance (local or hosted)
- A Stripe test account (free)

### Install

```bash
git clone https://github.com/coleyrockin/shop-shop.git
cd shop-shop

# Installs root devDeps and runs the monorepo install hook for both server and client.
npm install
```

### Configure environment

Copy the example files and fill in your values:

```bash
cp .env.example .env
cp client/.env.example client/.env
```

| Variable | Where | Required | Purpose |
|---|---|---|---|
| `PORT` | server | no | API port (default 3001) |
| `NODE_ENV` | server | no | `development` or `production` |
| `MONGODB_URI` | server | no | MongoDB connection string (defaults to local) |
| `JWT_SECRET` | server | **prod** | JWT signing secret. Required when `NODE_ENV=production`. |
| `STRIPE_SECRET_KEY` | server | for checkout | `sk_test_...` from Stripe |
| `CLIENT_URL` | server | for prod checkout | Origin used in Stripe success/cancel URLs |
| `REACT_APP_STRIPE_PUBLIC_KEY` | client | for checkout | `pk_test_...` from Stripe |

### Seed the database

```bash
npm run seed
```

This loads sample categories and products into the configured MongoDB database.

### Run locally

```bash
npm run develop
```

This runs the API on `http://localhost:3001` and the client on `http://localhost:3000` with proxy forwarding to the API.

### Build for production

```bash
npm run build
npm start  # serves the built client + API on PORT
```

## Scripts

| Script | What it does |
|---|---|
| `npm run develop` | Start API + client in watch mode |
| `npm start` | Start API only (production mode) |
| `npm run build` | Build the client into `client/build/` |
| `npm run seed` | Reset and seed the MongoDB database |
| `npm run lint` | Lint the server (`server/`) with ESLint |
| `npm run format` | Run Prettier on the repo |

## Project structure

```
shop-shop/
├── client/                 # React + Apollo Client
│   ├── public/
│   └── src/
│       ├── components/     # Cart, CartItem, CategoryMenu, Jumbotron, Nav, ProductItem, ProductList
│       ├── pages/          # Home, Detail, Login, Signup, OrderHistory, Success, NoMatch
│       └── utils/          # auth, GlobalState, reducers, queries, mutations, helpers (IndexedDB)
├── server/                 # Express + Apollo Server
│   ├── config/             # Mongoose connection + seeds
│   ├── models/             # User, Product, Category, Order
│   ├── schemas/            # GraphQL typeDefs + resolvers
│   └── utils/              # auth (JWT)
├── .github/workflows/      # CI
├── README.md
├── SECURITY_AUDIT.md       # Security hardening notes
└── package.json            # Monorepo orchestrator
```

## Security

The server treats user input as untrusted and re-derives prices, quantities, and totals server-side at checkout. JWT secrets are required in production. Mongoose `sanitizeFilter` is enabled. See [`SECURITY_AUDIT.md`](./SECURITY_AUDIT.md) for the full hardening pass and remaining roadmap.

**Known limitations** (deliberate scope for portfolio):

- JWT is stored in `localStorage`, which is vulnerable to XSS exfiltration. A production deploy should switch to httpOnly cookies + CSRF protection.
- No rate limiting on `/graphql`. Add `express-rate-limit` before deploying publicly.
- No admin role yet — inventory mutations are gated by login but not by role.
- `apollo-server-express` v3 is end-of-life; migrating to `@apollo/server` is on the roadmap.

## What I learned

- Server-side price authority for any flow that touches money
- Verifying a Stripe Checkout session before creating an order, instead of trusting the browser redirect
- Wiring Apollo Client + Apollo Server with shared GraphQL schemas
- A Context + `useReducer` pattern for global state (no Redux)
- Layering an IndexedDB cache under the cart so it survives reload and offline use

## Roadmap

See [`SECURITY_AUDIT.md`](./SECURITY_AUDIT.md) for the security roadmap. Product roadmap, in priority order:

1. Add a hosted live demo + a 30-second demo GIF
2. Stripe webhook for order finalization (replace browser-redirect verification)
3. Admin role + product/category CRUD UI
4. Rate limiting + helmet on the API
5. Migrate from Apollo Server Express 3 to `@apollo/server`
6. Replace CRA with Vite (clears transitive dev-dep advisories)
7. React 18 upgrade + `createRoot`
8. Switch JWT storage from `localStorage` to httpOnly cookies + CSRF

## License

ISC — see [`LICENSE`](./LICENSE).

## Author

Built by [Boyd Roberts](https://github.com/coleyrockin).
