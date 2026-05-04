const { AuthenticationError, UserInputError } = require('apollo-server-express');
const { User, Product, Category, Order } = require('../models');
const { signToken } = require('../utils/auth');

const stripe = process.env.STRIPE_SECRET_KEY
  ? require('stripe')(process.env.STRIPE_SECRET_KEY)
  : null;

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getRequestOrigin = (context) => {
  if (process.env.CLIENT_URL) {
    return process.env.CLIENT_URL.replace(/\/$/, '');
  }

  const referer = context.headers && context.headers.referer;

  if (!referer) {
    throw new UserInputError('Checkout requires a valid request origin');
  }

  const origin = new URL(referer).origin;

  if (!/^https?:\/\//.test(origin)) {
    throw new UserInputError('Invalid request origin');
  }

  return origin;
};

const countProductIds = (productIds) => {
  if (!productIds.length) {
    throw new UserInputError('At least one product is required');
  }

  return productIds.reduce((counts, productId) => {
    counts[productId] = (counts[productId] || 0) + 1;
    return counts;
  }, {});
};

const normalizeProductIds = (productIds) => [...productIds].sort().join(',');

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: escapeRegex(name.trim()).slice(0, 80),
          $options: 'i'
        };
      }

      return await Product.find(params).populate('category');
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate('category');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    checkout: async (parent, { products: productIds }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }

      if (!stripe) {
        throw new Error('Stripe checkout is not configured');
      }

      const origin = getRequestOrigin(context);
      const productCounts = countProductIds(productIds);
      const uniqueProductIds = Object.keys(productCounts);
      const products = await Product.find({ _id: { $in: uniqueProductIds } });

      if (products.length !== uniqueProductIds.length) {
        throw new UserInputError('Invalid product in checkout');
      }

      const line_items = products.map((product) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            description: product.description,
            images: product.image ? [`${origin}/images/${product.image}`] : []
          },
          unit_amount: Math.round(product.price * 100)
        },
        quantity: productCounts[product._id.toString()]
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        client_reference_id: String(context.user._id),
        metadata: {
          userId: String(context.user._id),
          productIds: normalizeProductIds(productIds)
        },
        success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/`
      });

      return { session: session.id };
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create({
        ...args,
        email: args.email.toLowerCase().trim()
      });
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { products, checkoutSessionId }, context) => {
      if (context.user) {
        if (!stripe) {
          throw new Error('Stripe checkout is not configured');
        }

        const session = await stripe.checkout.sessions.retrieve(checkoutSessionId);

        if (
          session.payment_status !== 'paid' ||
          !session.metadata ||
          session.metadata.userId !== String(context.user._id) ||
          session.metadata.productIds !== normalizeProductIds(products)
        ) {
          throw new AuthenticationError('Payment confirmation failed');
        }

        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);

        Object.keys(args).forEach((key) => {
          if (key === 'email') {
            user.email = args.email.toLowerCase().trim();
          } else {
            user[key] = args[key];
          }
        });

        return await user.save();
      }

      throw new AuthenticationError('Not logged in');
    },
    updateProduct: async (parent, { _id, quantity }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }

      if (quantity < 1) {
        throw new UserInputError('Quantity must be positive');
      }

      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email: email.toLowerCase().trim() });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
