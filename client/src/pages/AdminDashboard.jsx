import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalSales: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await API.get("/admin/stats");

      setStats(
        response.data.data || {
          totalUsers: 0,
          totalProducts: 0,
          totalOrders: 0,
          totalSales: 0
        }
      );
    } catch (error) {
      console.log("Admin Stats Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner"></div>
        <h3>Loading Dashboard...</h3>
        <p>Please wait...</p>
      </div>
    );
  }

  return (
    <div className="admin-page">

      <div className="container">

        {/* Dashboard Header */}

        <div className="admin-dashboard-header">

          <div>
            <span className="admin-eyebrow">
              SHOP EASY ADMIN
            </span>

            <h1>
              Admin Dashboard
            </h1>

            <p>
              Manage your store, products, orders and customers.
            </p>
          </div>

          <div className="admin-header-actions">

            <Link
              to="/admin/products"
              className="admin-add-product-btn"
            >
              + Add Product
            </Link>

          </div>

        </div>

        {/* Statistics */}

        <div className="row g-4">

          {/* Users */}

          <div className="col-12 col-sm-6 col-xl-3">

            <div className="admin-stat-card">

              <div className="stat-top">

                <div className="stat-icon users-icon">
                  👥
                </div>

                <span className="stat-arrow">
                  ↗
                </span>

              </div>

              <p>
                Total Users
              </p>

              <h2>
                {stats.totalUsers}
              </h2>

              <span className="stat-description">
                Registered customers
              </span>

            </div>

          </div>

          {/* Products */}

          <div className="col-12 col-sm-6 col-xl-3">

            <div className="admin-stat-card">

              <div className="stat-top">

                <div className="stat-icon products-icon">
                  📦
                </div>

                <span className="stat-arrow">
                  ↗
                </span>

              </div>

              <p>
                Total Products
              </p>

              <h2>
                {stats.totalProducts}
              </h2>

              <span className="stat-description">
                Products in store
              </span>

            </div>

          </div>

          {/* Orders */}

          <div className="col-12 col-sm-6 col-xl-3">

            <div className="admin-stat-card">

              <div className="stat-top">

                <div className="stat-icon orders-icon">
                  🛍️
                </div>

                <span className="stat-arrow">
                  ↗
                </span>

              </div>

              <p>
                Total Orders
              </p>

              <h2>
                {stats.totalOrders}
              </h2>

              <span className="stat-description">
                Customer orders
              </span>

            </div>

          </div>

          {/* Sales */}

          <div className="col-12 col-sm-6 col-xl-3">

            <div className="admin-stat-card">

              <div className="stat-top">

                <div className="stat-icon sales-icon">
                  💰
                </div>

                <span className="stat-arrow">
                  ↗
                </span>

              </div>

              <p>
                Total Sales
              </p>

              <h2>
                ₹{Number(stats.totalSales || 0).toLocaleString("en-IN")}
              </h2>

              <span className="stat-description">
                Total order revenue
              </span>

            </div>

          </div>

        </div>

        {/* Quick Actions */}

        <div className="admin-section">

          <div className="admin-section-heading">

            <div>
              <span>
                MANAGEMENT
              </span>

              <h2>
                Quick Actions
              </h2>
            </div>

            <p>
              Manage your ShopEasy store
            </p>

          </div>

          <div className="row g-4">

            {/* Products */}

            <div className="col-12 col-md-4">

              <Link
                to="/admin/products"
                className="admin-action-card"
              >

                <div className="action-icon">
                  📦
                </div>

                <div className="action-content">

                  <h3>
                    Manage Products
                  </h3>

                  <p>
                    Add, edit and remove products.
                  </p>

                </div>

                <span className="action-arrow">
                  →
                </span>

              </Link>

            </div>

            {/* Orders */}

            <div className="col-12 col-md-4">

              <Link
                to="/admin/orders"
                className="admin-action-card"
              >

                <div className="action-icon">
                  🛍️
                </div>

                <div className="action-content">

                  <h3>
                    Manage Orders
                  </h3>

                  <p>
                    View orders and update status.
                  </p>

                </div>

                <span className="action-arrow">
                  →
                </span>

              </Link>

            </div>

            {/* Users */}

            <div className="col-12 col-md-4">

              <Link
                to="/admin/users"
                className="admin-action-card"
              >

                <div className="action-icon">
                  👥
                </div>

                <div className="action-content">

                  <h3>
                    Manage Users
                  </h3>

                  <p>
                    View and manage customers.
                  </p>

                </div>

                <span className="action-arrow">
                  →
                </span>

              </Link>

            </div>

          </div>

        </div>

        {/* Welcome */}

        <div className="admin-welcome">

          <div className="welcome-icon">
            👋
          </div>

          <div>

            <h2>
              Welcome to ShopEasy Admin
            </h2>

            <p>
              Everything you need to manage your online store
              is available from this dashboard.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;