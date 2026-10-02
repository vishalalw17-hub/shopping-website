import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="shop-footer">

      {/* =========================
          MAIN FOOTER
      ========================= */}
      <div className="footer-main">

        <div className="container">

          <div className="row g-5">

            {/* BRAND */}
            <div className="col-12 col-lg-4">

              <Link
                to="/"
                className="footer-brand"
              >
                <span className="footer-brand-icon">
                  🛍️
                </span>

                <span>
                  Shop<span>Easy</span>
                </span>
              </Link>

              <p className="footer-description">
                Your one-stop destination for
                fashion, electronics, footwear,
                beauty and everyday essentials.
              </p>

              <div className="footer-trust">

                <div>
                  🔒
                  <span>
                    Secure Payments
                  </span>
                </div>

                <div>
                  🚚
                  <span>
                    Fast Delivery
                  </span>
                </div>

              </div>

            </div>


            {/* QUICK LINKS */}
            <div className="col-6 col-md-4 col-lg-2">

              <h5 className="footer-title">
                Quick Links
              </h5>

              <ul className="footer-links">

                <li>
                  <Link to="/">
                    Home
                  </Link>
                </li>

                <li>
                  <Link to="/products">
                    Products
                  </Link>
                </li>

                <li>
                  <Link to="/cart">
                    Cart
                  </Link>
                </li>

                <li>
                  <Link to="/my-orders">
                    My Orders
                  </Link>
                </li>

                <li>
                  <Link to="/user">
                    My Profile
                  </Link>
                </li>

              </ul>

            </div>


            {/* CATEGORIES */}
            <div className="col-6 col-md-4 col-lg-2">

              <h5 className="footer-title">
                Categories
              </h5>

              <ul className="footer-links">

                <li>
                  <Link to="/products?category=Fashion">
                    Fashion
                  </Link>
                </li>

                <li>
                  <Link to="/products?category=Electronics">
                    Electronics
                  </Link>
                </li>

                <li>
                  <Link to="/products?category=Footwear">
                    Footwear
                  </Link>
                </li>

                <li>
                  <Link to="/products?category=Beauty">
                    Beauty
                  </Link>
                </li>

                <li>
                  <Link to="/products?category=Accessories">
                    Accessories
                  </Link>
                </li>

              </ul>

            </div>


            {/* SUPPORT */}
            <div className="col-12 col-md-4 col-lg-2">

              <h5 className="footer-title">
                Customer Support
              </h5>

              <ul className="footer-links">

                <li>
                  <Link to="/products">
                    Shopping Help
                  </Link>
                </li>

                <li>
                  <Link to="/my-orders">
                    Track Order
                  </Link>
                </li>

                <li>
                  <Link to="/cart">
                    Returns
                  </Link>
                </li>

                <li>
                  <Link to="/login">
                    Account
                  </Link>
                </li>

              </ul>

            </div>


            {/* CONTACT */}
            <div className="col-12 col-lg-2">

              <h5 className="footer-title">
                Contact Us
              </h5>

              <div className="footer-contact">

                <p>
                  📧
                  <span>
                    support@shopeasy.com
                  </span>
                </p>

                <p>
                  📞
                  <span>
                    +91 98765 43210
                  </span>
                </p>

                <p>
                  📍
                  <span>
                    India
                  </span>
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* =========================
          NEWSLETTER
      ========================= */}
      <div className="footer-newsletter">

        <div className="container">

          <div className="newsletter-box">

            <div>

              <span className="newsletter-label">
                STAY UPDATED
              </span>

              <h3>
                Get the latest deals & offers
              </h3>

              <p>
                Subscribe to receive updates
                about new products and special
                offers.
              </p>

            </div>

            <div className="newsletter-form">

              <input
                type="email"
                placeholder="Enter your email"
              />

              <button type="button">
                Subscribe
              </button>

            </div>

          </div>

        </div>

      </div>


      {/* =========================
          BOTTOM FOOTER
      ========================= */}
      <div className="footer-bottom">

        <div className="container">

          <div className="footer-bottom-inner">

            <p>
              © {new Date().getFullYear()} ShopEasy.
              All rights reserved.
            </p>

            <div className="footer-social">

              <a href="#instagram">
                📸
              </a>

              <a href="#facebook">
                f
              </a>

              <a href="#twitter">
                𝕏
              </a>

              <a href="#youtube">
                ▶
              </a>

            </div>

            <div className="footer-policies">

              <span>
                Privacy Policy
              </span>

              <span>
                Terms & Conditions
              </span>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;