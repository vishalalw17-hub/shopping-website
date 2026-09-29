import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./AdminOrders.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || user.role !== "admin") {
      window.location.href = "/";
      return;
    }

    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await API.get("/admin/orders");

      setOrders(response.data.data || []);
    } catch (error) {
      console.log("Admin Orders Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      setUpdatingId(orderId);

      await API.put(`/admin/orders/${orderId}`, {
        orderStatus: status
      });

      alert("Order status updated successfully");

      fetchOrders();
    } catch (error) {
      console.log("Update Status Error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to update order status"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="admin-orders-loading">
        <div className="admin-orders-spinner"></div>
        <h3>Loading Orders...</h3>
      </div>
    );
  }

  return (
    <div className="admin-orders-page">

      <div className="container">

        {/* Header */}

        <div className="admin-orders-heading">

          <div>
            <span>ADMIN PANEL</span>

            <h1>Orders Management</h1>

            <p>
              Manage customer orders and update delivery status.
            </p>
          </div>

          <div className="orders-count-box">
            <strong>{orders.length}</strong>
            <span>Total Orders</span>
          </div>

        </div>

        {/* Orders */}

        {orders.length === 0 ? (

          <div className="admin-empty-orders">

            <div>📦</div>

            <h2>No Orders Found</h2>

            <p>
              Customer orders will appear here after checkout.
            </p>

          </div>

        ) : (

          <div className="admin-orders-list">

            {orders.map((order) => (

              <div
                className="admin-order-card"
                key={order._id}
              >

                {/* Order Top */}

                <div className="admin-order-top">

                  <div>

                    <span className="admin-order-label">
                      ORDER ID
                    </span>

                    <strong>
                      #{order._id}
                    </strong>

                    <small>
                      {order.createdAt &&
                        new Date(
                          order.createdAt
                        ).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                          }
                        )}
                    </small>

                  </div>

                  <div className="admin-order-total">

                    <span>
                      TOTAL
                    </span>

                    <strong>
                      ₹
                      {Number(
                        order.totalAmount
                      ).toLocaleString("en-IN")}
                    </strong>

                  </div>

                </div>

                <div className="admin-order-divider"></div>

                {/* Customer */}

                <div className="admin-customer-section">

                  <h3>
                    Customer Information
                  </h3>

                  <div className="customer-info-grid">

                    <div>
                      <span>Name</span>

                      <strong>
                        {order.shippingAddress?.name}
                      </strong>
                    </div>

                    <div>
                      <span>Phone</span>

                      <strong>
                        {order.shippingAddress?.phone}
                      </strong>
                    </div>

                    <div>
                      <span>Payment</span>

                      <strong>
                        {order.paymentMethod}
                      </strong>
                    </div>

                    <div>
                      <span>Payment Status</span>

                      <strong className="payment-status">
                        {order.paymentStatus}
                      </strong>
                    </div>

                  </div>

                </div>

                <div className="admin-order-divider"></div>

                {/* Products */}

                <div className="admin-products-section">

                  <h3>
                    Ordered Products
                  </h3>

                  {order.items?.map((item, index) => (

                    <div
                      className="admin-product-row"
                      key={item._id || index}
                    >

                      <div className="admin-product-image">

                        <img
                          src={item.image}
                          alt={item.name}
                        />

                      </div>

                      <div className="admin-product-info">

                        <strong>
                          {item.name}
                        </strong>

                        <span>
                          ₹
                          {Number(
                            item.price
                          ).toLocaleString("en-IN")}
                          {" "}×{" "}
                          {item.quantity}
                        </span>

                      </div>

                      <strong className="admin-product-price">
                        ₹
                        {(
                          Number(item.price) *
                          Number(item.quantity)
                        ).toLocaleString("en-IN")}
                      </strong>

                    </div>

                  ))}

                </div>

                <div className="admin-order-divider"></div>

                {/* Address */}

                <div className="admin-address">

                  <span>
                    📍 DELIVERY ADDRESS
                  </span>

                  <p>
                    {order.shippingAddress?.address},{" "}
                    {order.shippingAddress?.city},{" "}
                    {order.shippingAddress?.state}
                    {" - "}
                    {order.shippingAddress?.pincode}
                  </p>

                </div>

                {/* Status */}

                <div className="admin-status-section">

                  <div>

                    <span>
                      CURRENT STATUS
                    </span>

                    <strong
                      className={`admin-status-badge ${order.orderStatus
                        ?.toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      ● {order.orderStatus}
                    </strong>

                  </div>

                  <div className="status-control">

                    <label>
                      Update Status
                    </label>

                    <select
                      value={order.orderStatus}
                      disabled={updatingId === order._id}
                      onChange={(e) =>
                        updateStatus(
                          order._id,
                          e.target.value
                        )
                      }
                    >

                      <option value="Placed">
                        Placed
                      </option>

                      <option value="Processing">
                        Processing
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>

                    </select>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default AdminOrders;