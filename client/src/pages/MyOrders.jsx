import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "./MyOrders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    if (user) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await API.get(
        "/orders/my-orders"
      );

      setOrders(response.data.data || []);

    } catch (error) {
      console.log("Order Error:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="orders-login">
        <div className="orders-login-card">

          <div className="orders-icon">
            🔐
          </div>

          <h2>Please Login First</h2>

          <p>
            Login to view your orders and track your purchases.
          </p>

          <Link
            to="/login"
            className="orders-primary-btn"
          >
            Login Now
          </Link>

        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="orders-loading">

        <div className="orders-spinner"></div>

        <h3>
          Loading your orders...
        </h3>

        <p>
          Please wait a moment.
        </p>

      </div>
    );
  }

  return (
    <div className="orders-page">

      <div className="container">

        {/* Page Header */}
        <div className="orders-heading">

          <span>
            MY ACCOUNT
          </span>

          <h1>
            My Orders
          </h1>

          <p>
            Track and manage all your purchases in one place.
          </p>

        </div>

        {/* Order Count */}
        {orders.length > 0 && (
          <div className="orders-summary-bar">

            <div>
              <strong>
                {orders.length}
              </strong>

              <span>
                {orders.length === 1
                  ? " Order"
                  : " Orders"}
              </span>
            </div>

            <Link to="/products">
              Continue Shopping →
            </Link>

          </div>
        )}

        {/* Empty Orders */}
        {orders.length === 0 ? (

          <div className="empty-orders">

            <div className="empty-orders-icon">
              📦
            </div>

            <h2>
              No Orders Yet
            </h2>

            <p>
              You haven't placed any orders yet.
              Start shopping and your orders will appear here.
            </p>

            <Link
              to="/products"
              className="orders-primary-btn"
            >
              Start Shopping →
            </Link>

          </div>

        ) : (

          <div className="orders-list">

            {orders.map((order) => (

              <div
                className="order-card"
                key={order._id}
              >

                {/* Order Header */}
                <div className="order-header">

                  <div>

                    <span className="order-label">
                      ORDER ID
                    </span>

                    <strong className="order-id">
                      #{order._id}
                    </strong>

                    {order.createdAt && (
                      <small className="order-date">
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric"
                        })}
                      </small>
                    )}

                  </div>

                  <div className="order-status-box">

                    <span className="order-label">
                      STATUS
                    </span>

                    <span
                      className={`order-status ${
                        order.orderStatus
                          ?.toLowerCase()
                          .replace(/\s+/g, "-")
                      }`}
                    >
                      ● {order.orderStatus}
                    </span>

                  </div>

                </div>

                <div className="order-divider"></div>

                {/* Products */}
                <div className="ordered-products">

                  {order.items?.map((item, index) => (

                    <div
                      className="order-item"
                      key={item._id || index}
                    >

                      <div className="order-item-image">

                        <img
                          src={item.image}
                          alt={item.name}
                        />

                      </div>

                      <div className="order-item-details">

                        <h3>
                          {item.name}
                        </h3>

                        <p>
                          ₹
                          {Number(
                            item.price
                          ).toLocaleString("en-IN")}
                          {" × "}
                          {item.quantity}
                        </p>

                        <span>
                          Quantity: {item.quantity}
                        </span>

                      </div>

                      <div className="order-item-price">
                        ₹
                        {(
                          Number(item.price) *
                          Number(item.quantity)
                        ).toLocaleString("en-IN")}
                      </div>

                    </div>

                  ))}

                </div>

                <div className="order-divider"></div>

                {/* Order Bottom */}
                <div className="order-bottom">

                  {/* Payment */}
                  <div className="order-info">

                    <span className="order-label">
                      PAYMENT
                    </span>

                    <strong>
                      💵 {order.paymentMethod}
                    </strong>

                    <small>
                      Payment Status:{" "}
                      {order.paymentStatus}
                    </small>

                  </div>

                  {/* Total */}
                  <div className="order-total-box">

                    <span className="order-label">
                      TOTAL AMOUNT
                    </span>

                    <strong>
                      ₹
                      {Number(
                        order.totalAmount
                      ).toLocaleString("en-IN")}
                    </strong>

                  </div>

                </div>

                {/* Delivery Address */}
                <div className="delivery-address">

                  <div className="delivery-title">
                    📍 Delivery Address
                  </div>

                  <p>

                    <strong>
                      {order.shippingAddress?.name}
                    </strong>

                    {" • "}

                    {order.shippingAddress?.phone}

                    <br />

                    {order.shippingAddress?.address}

                    <br />

                    {order.shippingAddress?.city}
                    {", "}
                    {order.shippingAddress?.state}
                    {" - "}
                    {order.shippingAddress?.pincode}

                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default MyOrders;