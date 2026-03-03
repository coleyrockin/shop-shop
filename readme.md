# Shop-Shop

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