# Security Audit and Roadmap

## Audit summary

- Removed hardcoded server-side Stripe secret usage and now require `STRIPE_SECRET_KEY` for checkout.
- Removed hardcoded production JWT secret usage and now require `JWT_SECRET` when `NODE_ENV=production`.
- Rebuilt checkout so product prices come from MongoDB, duplicate cart entries become server-side quantities, and orders require a paid Stripe session for the authenticated user.
- Escaped product search input before using it in MongoDB regex filters.
- Hardened Express defaults with body-size limits and common security headers.
- Fixed user profile updates so password changes run through the Mongoose hashing hook.
- Upgraded the server dependency stack for Apollo Server 3, bcrypt 6, jsonwebtoken 9, Mongoose 6, Express 4.21, and Nodemon 3.
- Upgraded the client build stack to React Scripts 5 with GraphQL 15 and current Babel core compatibility.

## Remaining roadmap

- Rotate any Stripe secret that was previously committed or used locally.
- Add an admin role before exposing inventory mutation flows beyond trusted users.
- Move GraphQL serving from end-of-life `apollo-server-express` to `@apollo/server`.
- Consider replacing Create React App with Vite or a maintained React framework to clear the remaining build-tool transitive audit findings.
- Add server-side integration tests for checkout, addOrder, login, and updateUser password hashing.
- Add a webhook-backed Stripe fulfillment flow so orders are created from signed Stripe events instead of browser redirect completion.
