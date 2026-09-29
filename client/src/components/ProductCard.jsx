import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">

      {/* Product Image */}
      <div className="product-image-box">

        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />

        <span className="product-badge">
          New
        </span>

        <button
          className="wishlist-btn"
          type="button"
        >
          ♡
        </button>

      </div>

      {/* Product Details */}
      <div className="product-details">

        <p className="product-brand">
          {product.brand || "ShopEasy"}
        </p>

        {/* Clickable Product Name */}
        <Link
          to={`/products/${product._id}`}
          className="product-name-link"
        >
          <h5 className="product-name">
            {product.name}
          </h5>
        </Link>

        <p className="product-description">
          {product.description}
        </p>

        <div className="product-rating">
          <span>⭐</span>
          {product.rating || "4.5"}

          <small>
            (120)
          </small>
        </div>

        <div className="product-price-row">
          <strong>
            ₹{product.price}
          </strong>
        </div>

        <div className="product-delivery">
          🚚 Free Delivery
        </div>

        <button
          className="add-cart-btn"
          type="button"
          onClick={() => onAddToCart(product)}
        >
          🛒 Add to Cart
        </button>

      </div>

    </div>
  );
}

export default ProductCard;