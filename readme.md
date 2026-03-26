# Shop-Shop

![React](https://img.shields.io/badge/React-16.13-61DAFB?style=flat&logo=react&logoColor=white)
![Apollo Client](https://img.shields.io/badge/Apollo_Client-3-311C87?style=flat&logo=apollographql&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-4-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-5.9-47A248?style=flat&logo=mongodb&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-15-E10098?style=flat&logo=graphql&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue?style=flat)

## About

A full-stack e-commerce application built with the MERN stack and GraphQL. Users can browse products by category, view product details, sign up or log in, add items to a shopping cart, and complete purchases with order history tracking.

## Features

- Browse products and filter by category
- View individual product details with name, description, price, and image
- User signup and login with JWT-based authentication
- Persistent shopping cart functionality
- Checkout and order creation
- Order history for authenticated users
- GraphQL API with queries and mutations
- Database seeding with sample product data

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

> Built by [coleyrockin](https://github.com/coleyrockin)# Shop-Shop

An e-commerce application built with the MERN stack (MongoDB, Express.js, React, Node.js) and GraphQL. Users can browse products by category, view product details, sign up/log in, add items to a cart, and complete purchases with order history tracking.

## Technologies

- **Frontend:** React, Apollo Client, React Router, JWT Decode
- **Backend:** Node.js, Express.js, Apollo Server Express, MongoDB, Mongoose
- **Authentication:** JSON Web Tokens (JWT), bcrypt

## Features

- Browse products and filter by category
- View individual product details (name, description, price, image)
- User signup and login with JWT-based authentication
- Shopping cart functionality
- Checkout and order creation
- Order history for authenticated users

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/coleyrockin/shop-shop.git
   cd shop-shop
   ```

2. Install dependencies for both client and server:
   ```bash
   npm install
   ```

3. Seed the database:
   ```bash
   npm run seed
   ```

4. Start the development server:
   ```bash
   npm run develop
   ```

   This runs the Express/GraphQL backend and the React frontend concurrently.

## Usage

- Visit `http://localhost:3000` in your browser for the React frontend.
- The GraphQL API is available at `http://localhost:3001/graphql`.

## License

ISC
