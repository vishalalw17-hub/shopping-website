import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");

  // =========================
  // CART COUNT
  // =========================
  const updateCartCount = () => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const count = cart.reduce(
      (total, item) =>
        total + (item.quantity || 0),
      0
    );

    setCartCount(count);
  };

  // =========================
  // CHECK USER
  // =========================
  const checkUser = () => {
    const savedUser =
      JSON.parse(
        localStorage.getItem("user")
      );

    setUser(savedUser);
  };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {

    // Remove logged-in user
    localStorage.removeItem("user");

    // Remove JWT token
    localStorage.removeItem("token");

    // Clear user from Header
    setUser(null);

    // Notify other components
    window.dispatchEvent(
      new Event("userUpdated")
    );

    // Go to login page
    navigate("/login");
  };

  // =========================
  // SEARCH
  // =========================
  const handleSearch = () => {
    const searchValue = search.trim();

    if (!searchValue) {
      navigate("/products");
      return;
    }

    navigate(
      `/products?search=${encodeURIComponent(
        searchValue
      )}`
    );
  };

  // =========================
  // LOAD DATA
  // =========================
  useEffect(() => {
    updateCartCount();
    checkUser();

    window.addEventListener(
      "cartUpdated",
      updateCartCount
    );

    window.addEventListener(
      "userUpdated",
      checkUser
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        updateCartCount
      );

      window.removeEventListener(
        "userUpdated",
        checkUser
      );
    };
  }, []);

  return (
    <>
      {/* =========================
          TOP BAR
      ========================= */}
      <div className="top-bar">
        <div className="header-container top-bar-inner">

          <span>
            🚚 Free delivery on orders above ₹499
          </span>

          <span className="top-right">
            Easy Returns &nbsp; | &nbsp;
            Secure Payments
          </span>

        </div>
      </div>

      {/* =========================
          MAIN HEADER
      ========================= */}
      <header className="main-header">

        <div className="header-container header-main">

          {/* LOGO */}
          <Link
            to="/"
            className="brand-logo"
          >
            <span className="brand-icon">
              🛍️
            </span>

            <span className="brand-name">
              Shop<span>Easy</span>
            </span>
          </Link>

          {/* SEARCH */}
          <div className="header-search">

            <span className="search-icon">
              🔍
            </span>

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="Search for products, brands and more..."
            />

            <button
              type="button"
              onClick={handleSearch}
            >
              Search
            </button>

          </div>

          {/* =========================
              HEADER ACTIONS
          ========================= */}
          <div className="header-actions">

            {/* USER */}
            {user ? (

              <div className="user-account-wrapper">

                <Link
                  to="/user"
                  className="header-action user-action"
                >

                  <span className="action-icon">
                    👤
                  </span>

                  <div className="action-text">

                    <small>
                      Hello
                    </small>

                    <strong>
                      {user.name}
                    </strong>

                  </div>

                </Link>

                {/* USER DROPDOWN */}
                <div className="user-dropdown">

                  <Link to="/user">
                    <span>👤</span>
                    My Profile
                  </Link>

                  {user.role === "admin" && (
                    <Link to="/admin">
                      <span>🛠️</span>
                      Admin Panel
                    </Link>
                  )}

                  {user.role === "admin" && (
                    <Link to="/admin/products">
                      <span>📦</span>
                      Manage Products
                    </Link>
                  )}

                  {user.role === "admin" && (
                    <Link to="/admin/orders">
                      <span>🧾</span>
                      Manage Orders
                    </Link>
                  )}

                  {/* LOGOUT */}
                  <button
                    type="button"
                    onClick={handleLogout}
                  >
                    <span>🚪</span>
                    Logout
                  </button>

                </div>

              </div>

            ) : (

              <Link
                to="/login"
                className="header-action"
              >

                <span className="action-icon">
                  👤
                </span>

                <div className="action-text">

                  <small>
                    Hello,
                  </small>

                  <strong>
                    Login
                  </strong>

                </div>

              </Link>

            )}

            {/* ORDERS */}
            <Link
              to="/my-orders"
              className="header-action orders-action"
            >

              <span className="action-icon">
                📦
              </span>

              <div className="action-text">

                <small>
                  Track
                </small>

                <strong>
                  Orders
                </strong>

              </div>

            </Link>

            {/* CART */}
            <Link
              to="/cart"
              className="cart-action"
            >

              <span className="cart-icon">
                🛒
              </span>

              <span className="cart-text">
                Cart
              </span>

              {cartCount > 0 && (
                <span className="cart-count">
                  {cartCount}
                </span>
              )}

            </Link>

          </div>

        </div>

        {/* =========================
            CATEGORY NAVIGATION
        ========================= */}
        <div className="category-navigation">

          <div className="header-container category-inner">

            <Link to="/products">
              All Categories
            </Link>

            <Link to="/products?category=Fashion">
              👗 Fashion
            </Link>

            <Link to="/products?category=Electronics">
              📱 Electronics
            </Link>

            <Link to="/products?category=Footwear">
              👟 Footwear
            </Link>

            <Link to="/products?category=Beauty">
              💄 Beauty
            </Link>

            <Link to="/products?category=Home%20%26%20Living">
              🏠 Home & Living
            </Link>

            <Link to="/products?category=Accessories">
              ⌚ Accessories
            </Link>

            <Link
              to="/products"
              className="deal-link"
            >
              🔥 Deals
            </Link>

          </div>

        </div>

      </header>

      {/* =========================
          MOBILE BOTTOM NAV
      ========================= */}
      <div className="mobile-bottom-nav">

        <Link to="/">
          <span>🏠</span>
          <small>Home</small>
        </Link>

        <Link to="/products">
          <span>🔍</span>
          <small>Search</small>
        </Link>

        <Link to="/my-orders">
          <span>📦</span>
          <small>Orders</small>
        </Link>

        <Link to="/cart">

          <span className="mobile-cart-icon">

            🛒

            {cartCount > 0 && (
              <b>
                {cartCount}
              </b>
            )}

          </span>

          <small>
            Cart
          </small>

        </Link>

        <Link to="/user">
          <span>👤</span>
          <small>Account</small>
        </Link>

      </div>
    </>
  );
}

export default Header;