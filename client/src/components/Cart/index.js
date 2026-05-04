import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import './style.css';

const stripePublishKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
const stripePromise = stripePublishKey ? loadStripe(stripePublishKey) : null;

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      if (stripePromise) {
        stripePromise.then((res) => {
          res.redirectToCheckout({ sessionId: data.checkout.session });
        });
      }
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    if (!stripePromise) {
      alert('Checkout is not configured. Contact support to enable payments.');
      return;
    }

    const productIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }

  const cartCount = state.cart.reduce(
    (total, item) => total + Number(item.purchaseQuantity || 0),
    0
  );

  if (!state.cartOpen) {
    return (
      <button
        type="button"
        className="cart-closed"
        onClick={toggleCart}
        aria-expanded="false"
        aria-label={`Open cart (${cartCount} ${cartCount === 1 ? 'item' : 'items'})`}
      >
        <span role="img" aria-hidden="true">
          🛒
        </span>
        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
      </button>
    );
  }

  return (
    <div className="cart" role="dialog" aria-label="Shopping cart">
      <button
        type="button"
        className="close"
        onClick={toggleCart}
        aria-label="Close cart"
      >
        ×
      </button>
      <h2>Shopping Cart</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>

            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">
            😱
          </span>
          You haven't added anything to your cart yet!
        </h3>
      )}
    </div>
  );
};

export default Cart;
