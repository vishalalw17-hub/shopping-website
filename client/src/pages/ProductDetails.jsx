import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // Fetch single product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/products/${id}`);

        setProduct(response.data.data);
      } catch (error) {
        console.log("Product Details Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);


  // Add to cart
  const addToCart = () => {
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
              quantity: item.quantity + quantity
            }
          : item
      );
    } else {
      updatedCart = [
        ...oldCart,
        {
          ...product,
          quantity
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


  // Buy now
  const buyNow = () => {
    addToCart();

    navigate("/cart");
  };


  // Loading
  if (loading) {
    return (
      <div className="product-details-loading">
        <div className="spinner-border"></div>
        <p>Loading product...</p>
      </div>
    );
  }


  // Product not found
  if (!product) {
    return (
      <div className="product-not-found">
        <div>🛍️</div>

        <h2>Product Not Found</h2>

        <button
          onClick={() => navigate("/products")}
        >
          Back to Products
        </button>
      </div>
    );
  }


  return (
    <div className="product-details-page">

      <div className="container">

        {/* Breadcrumb */}

        <div className="product-breadcrumb">
          <span onClick={() => navigate("/")}>
            Home
          </span>

          <b> / </b>

          <span onClick={() => navigate("/products")}>
            Products
          </span>

          <b> / </b>

          <strong>{product.name}</strong>
        </div>


        {/* Product */}

        <div className="product-details-card">

          {/* Image */}

          <div className="product-details-image">

            <img
              src={product.image}
              alt={product.name}
            />

            <span className="details-badge">
              New
            </span>

          </div>


          {/* Information */}

          <div className="product-details-info">

            <p className="details-brand">
              {product.brand || "ShopEasy"}
            </p>

            <h1>
              {product.name}
            </h1>


            {/* Rating */}

            <div className="details-rating">
              ⭐ {product.rating || "4.5"}

              <span>
                120 Ratings
              </span>
            </div>


            <hr />


            {/* Price */}

            <div className="details-price">
              ₹{product.price}
            </div>


            <p className="details-tax">
              Inclusive of all taxes
            </p>


            {/* Description */}

            <p className="details-description">
              {product.description}
            </p>


            {/* Benefits */}

            <div className="details-benefits">

              <div>
                🚚
                <span>
                  Free Delivery
                </span>
              </div>

              <div>
                💳
                <span>
                  Cash on Delivery
                </span>
              </div>

              <div>
                🔄
                <span>
                  Easy Returns
                </span>
              </div>

            </div>


            {/* Quantity */}

            <div className="quantity-section">

              <strong>
                Quantity
              </strong>

              <div className="quantity-control">

                <button
                  onClick={() =>
                    setQuantity(
                      Math.max(1, quantity - 1)
                    )
                  }
                >
                  −
                </button>

                <span>
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity(quantity + 1)
                  }
                >
                  +
                </button>

              </div>

            </div>


            {/* Buttons */}

            <div className="details-buttons">

              <button
                className="details-cart-btn"
                onClick={addToCart}
              >
                🛒 Add to Cart
              </button>

              <button
                className="buy-now-btn"
                onClick={buyNow}
              >
                Buy Now
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;