# Shop-Shop

![React](https://img.shields.io/badge/React-16.x-61DAFB?style=flat&logo=react&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-API-E10098?style=flat&logo=graphql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-5.x-47A248?style=flat&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=flat&logo=express&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Runtime-339933?style=flat&logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue?style=flat)

## About

A full-stack e-commerce application built with the MERN stack and GraphQL. Users can browse products by category, view product details, sign up or log in, add items to a shopping cart, and complete purchases with order history tracking.

## Features

- **Browse & Filter** — View products and filter by category
- **Product Details** — Name, description, price, and image for each item
- **Authentication** — User signup and login with JWT-based authentication
- **Shopping Cart** — Persistent cart functionality across sessions
- **Checkout & Orders** — Complete purchases and view order history
- **GraphQL API** — Queries and mutations for all data operations
- **Database Seeding** — Sample product and category data included

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 16, Apollo Client 3, React Router DOM 5 |
| Backend | Node.js, Express.js 4, Apollo Server Express 2 |
| Database | MongoDB, Mongoose 5 |
| Auth | JSON Web Tokens (JWT), bcrypt 4 |
| GraphQL | graphql 14 (client) / 15 (server) |
| Dev Tools | Concurrently 5, Nodemon 2 |
| Testing | Jest, React Testing Library 9 |

## Getting Started

```bash
# Clone the repository
git clone https://github.com/coleyrockin/shop-shop.git
cd shop-shop

# Install all dependencies (client + server)
npm install

# Seed the database
npm run seed

# Start the development server
npm run develop
```

The React frontend runs at `http://localhost:3000` and the GraphQL API is available at `http://localhost:3001/graphql`.

## Project Structure

```
shop-shop/
├── client/
│   ├── public/
│   └── src/
├── server/
│   ├── config/
│   ├── models/
│   ├── schemas/
│   ├── utils/
│   └── server.js
└── package.json
```

---

Built by [Boyd Roberts](https://github.com/coleyrockin)
