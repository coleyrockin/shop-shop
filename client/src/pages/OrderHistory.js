import React from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import spinner from '../assets/spinner.gif';

function OrderHistory() {
  const { data, loading } = useQuery(QUERY_USER);
  const user = data?.user;

  return (
    <div className="container my-1">
      <Link to="/">← Back to Products</Link>

      {loading && !user ? (
        <div className="my-2">
          <img src={spinner} alt="Loading" />
        </div>
      ) : !user ? (
        <p className="my-2">Log in to see your order history.</p>
      ) : (
        <>
          <h2>
            Order History for {user.firstName} {user.lastName}
          </h2>

          {user.orders.length === 0 ? (
            <p className="my-2">You haven&rsquo;t placed any orders yet.</p>
          ) : (
            user.orders.map((order) => (
              <div key={order._id} className="my-2">
                <h3>{new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</h3>
                <div className="flex-row">
                  {order.products.map(({ _id, image, name, price }) => (
                    <div key={`${order._id}-${_id}`} className="card px-1 py-1">
                      <Link to={`/products/${_id}`}>
                        <img alt={name} src={`/images/${image}`} />
                        <p>{name}</p>
                      </Link>
                      <div>
                        <span>${price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}

export default OrderHistory;
