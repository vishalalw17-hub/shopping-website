import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH PRODUCTS
  // =========================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/products");

        setProducts(response.data.data || []);
      } catch (error) {
        console.log("Home Products Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // =========================
  // ADD TO CART
  // =========================
  const addToCart = (product) => {
    const oldCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = oldCart.find(
      (item) => item._id === product._id
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = oldCart.map((item) =>
        item._id === product._id
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      );
    } else {
      updatedCart = [
        ...oldCart,
        {
          ...product,
          quantity: 1
        }
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );

    alert(`${product.name} added to cart 🛒`);
  };

  return (
    <div>

      {/* =========================
          HERO SECTION
      ========================= */}
      <section className="home-hero">

        <div className="container">

          <div className="row align-items-center">

            {/* LEFT */}
            <div className="col-lg-6">

              <span className="hero-badge">
                🔥 Special Shopping Deals
              </span>

              <h1>
                Shop Smart.
                <br />
                Shop <span>Easy.</span>
              </h1>

              <p>
                Discover trending products,
                amazing deals and everything
                you need — all in one place.
              </p>

              <div className="hero-buttons">

                <Link
                  to="/products"
                  className="shop-now-btn"
                >
                  Shop Now →
                </Link>

                <Link
                  to="/products"
                  className="explore-btn"
                >
                  Explore Products
                </Link>

              </div>

              <div className="hero-features">

                <div>
                  <strong>
                    {products.length}+
                  </strong>

                  <small>
                    Products
                  </small>
                </div>

                <div>
                  <strong>
                    5K+
                  </strong>

                  <small>
                    Customers
                  </small>
                </div>

                <div>
                  <strong>
                    24/7
                  </strong>

                  <small>
                    Support
                  </small>
                </div>

              </div>

            </div>

            {/* RIGHT */}
            <div className="col-lg-6 text-center">

              <div className="hero-shopping-icon">
                🛍️
              </div>

              <div className="floating-card card-one">
                ⭐ 4.8 Rating
              </div>

              <div className="floating-card card-two">
                🚚 Fast Delivery
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          CATEGORIES
      ========================= */}
      <section className="categories-section">

        <div className="container">

          <div className="section-heading">

            <span>
              EXPLORE
            </span>

            <h2>
              Shop By Category
            </h2>

            <p>
              Find everything you need
              in one place
            </p>

          </div>


          <div className="row g-4">

            {/* FASHION */}
            <div className="col-6 col-md-3">

              <Link
                to="/products?category=Fashion"
                className="category-card"
              >

                <div className="category-icon">
                  👗
                </div>

                <h5>
                  Fashion
                </h5>

                <p>
                  Trending styles
                </p>

              </Link>

            </div>


            {/* ELECTRONICS */}
            <div className="col-6 col-md-3">

              <Link
                to="/products?category=Electronics"
                className="category-card"
              >

                <div className="category-icon">
                  📱
                </div>

                <h5>
                  Electronics
                </h5>

                <p>
                  Latest gadgets
                </p>

              </Link>

            </div>


            {/* FOOTWEAR */}
            <div className="col-6 col-md-3">

              <Link
                to="/products?category=Footwear"
                className="category-card"
              >

                <div className="category-icon">
                  👟
                </div>

                <h5>
                  Footwear
                </h5>

                <p>
                  Walk in style
                </p>

              </Link>

            </div>


            {/* BEAUTY */}
            <div className="col-6 col-md-3">

              <Link
                to="/products?category=Beauty"
                className="category-card"
              >

                <div className="category-icon">
                  💄
                </div>

                <h5>
                  Beauty
                </h5>

                <p>
                  Beauty essentials
                </p>

              </Link>

            </div>


            {/* HOME & LIVING */}
            <div className="col-6 col-md-3">

              <Link
                to="/products?category=Home%20%26%20Living"
                className="category-card"
              >

                <div className="category-icon">
                  🏠
                </div>

                <h5>
                  Home & Living
                </h5>

                <p>
                  Make your home better
                </p>

              </Link>

            </div>


            {/* ACCESSORIES */}
            <div className="col-6 col-md-3">

              <Link
                to="/products?category=Accessories"
                className="category-card"
              >

                <div className="category-icon">
                  ⌚
                </div>

                <h5>
                  Accessories
                </h5>

                <p>
                  Complete your look
                </p>

              </Link>

            </div>


            {/* BAGS */}
            <div className="col-6 col-md-3">

              <Link
                to="/products?category=Bags"
                className="category-card"
              >

                <div className="category-icon">
                  👜
                </div>

                <h5>
                  Bags
                </h5>

                <p>
                  Stylish bags
                </p>

              </Link>

            </div>


            {/* DEALS */}
            <div className="col-6 col-md-3">

              <Link
                to="/products"
                className="category-card"
              >

                <div className="category-icon">
                  🔥
                </div>

                <h5>
                  Deals
                </h5>

                <p>
                  Best offers
                </p>

              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          POPULAR PRODUCTS
      ========================= */}
      <section className="popular-products-section">

        <div className="container">

          <div className="popular-heading">

            <div>

              <span>
                SHOP NOW
              </span>

              <h2>
                Popular Products
              </h2>

              <p>
                Trending products picked
                just for you
              </p>

            </div>

            <Link
              to="/products"
              className="view-all-btn"
            >
              View All →
            </Link>

          </div>


          <div className="row g-4">

            {loading ? (

              <div className="col-12">

                <div className="home-products-empty">

                  <div>
                    ⏳
                  </div>

                  <p>
                    Loading products...
                  </p>

                </div>

              </div>

            ) : products.length === 0 ? (

              <div className="col-12">

                <div className="home-products-empty">

                  <div>
                    🛍️
                  </div>

                  <p>
                    No products available yet.
                  </p>

                </div>

              </div>

            ) : (

              products
                .slice(0, 4)
                .map((product) => (

                  <div
                    className="col-12 col-sm-6 col-lg-3"
                    key={product._id}
                  >

                    <ProductCard
                      product={product}
                      onAddToCart={addToCart}
                    />

                  </div>

                ))

            )}

          </div>

        </div>

      </section>


      {/* =========================
          BENEFITS
      ========================= */}
      <section className="benefits-section">

        <div className="container">

          <div className="row g-4">

            <div className="col-md-4">

              <div className="benefit-card">

                <div>
                  🚚
                </div>

                <h5>
                  Fast Delivery
                </h5>

                <p>
                  Get your products delivered
                  quickly to your doorstep.
                </p>

              </div>

            </div>


            <div className="col-md-4">

              <div className="benefit-card">

                <div>
                  🔒
                </div>

                <h5>
                  Secure Shopping
                </h5>

                <p>
                  Your account and orders
                  are protected with secure
                  technology.
                </p>

              </div>

            </div>


            <div className="col-md-4">

              <div className="benefit-card">

                <div>
                  💯
                </div>

                <h5>
                  Quality Products
                </h5>

                <p>
                  Discover products selected
                  for quality and value.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;