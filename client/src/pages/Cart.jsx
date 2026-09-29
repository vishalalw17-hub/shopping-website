import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  // =========================
  // LOAD CART
  // =========================
  const loadCart = () => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);
  };

  // =========================
  // UPDATE CART
  // =========================
  const updateCart = (updatedCart) => {
    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );
  };

  // =========================
  // INCREASE QUANTITY
  // =========================
  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item._id === id
        ? {
            ...item,
            quantity: (item.quantity || 1) + 1
          }
        : item
    );

    updateCart(updatedCart);
  };

  // =========================
  // DECREASE QUANTITY
  // =========================
  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: (item.quantity || 1) - 1
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  };

  // =========================
  // REMOVE PRODUCT
  // =========================
  const removeFromCart = (id) => {
    const updatedCart = cart.filter(
      (item) => item._id !== id
    );

    updateCart(updatedCart);
  };

  // =========================
  // TOTAL ITEMS
  // =========================
  const totalItems = cart.reduce(
    (total, item) =>
      total + (item.quantity || 0),
    0
  );

  // =========================
  // TOTAL PRICE
  // =========================
  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        (item.quantity || 0),
    0
  );

  // =========================
  // DELIVERY
  // =========================
  const deliveryCharge =
    totalPrice >= 499 ? 0 : 49;

  // =========================
  // FINAL TOTAL
  // =========================
  const finalTotal =
    totalPrice + deliveryCharge;

  // =========================
  // CHECKOUT
  // =========================
  const handleCheckout = () => {
    const user =
      JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login before checkout");
      navigate("/login");
      return;
    }

    navigate("/checkout");
  };

  return (
    <div className="cart-page">

      <div className="container">

        {/* =========================
            PAGE HEADING
        ========================= */}

        <div className="cart-heading">

          <span className="cart-heading-label">
            SHOPPING BAG
          </span>

          <h1>
            Your Shopping Cart
          </h1>

          <p>
            {totalItems}{" "}
            {totalItems === 1
              ? "item"
              : "items"}{" "}
            in your cart
          </p>

        </div>


        {/* =========================
            EMPTY CART
        ========================= */}

        {cart.length === 0 ? (

          <div className="empty-cart">

            <div className="empty-cart-icon">
              🛒
            </div>

            <h2>
              Your cart is empty
            </h2>

            <p>
              Looks like you haven't added
              anything to your cart yet.
            </p>

            <Link
              to="/products"
              className="shop-now-btn"
            >
              Continue Shopping →
            </Link>

          </div>

        ) : (

          <div className="row g-4">

            {/* =========================
                CART PRODUCTS
            ========================= */}

            <div className="col-lg-8">

              <div className="cart-box">

                <div className="cart-box-header">

                  <div>
                    <h4>
                      Cart Items
                    </h4>

                    <p>
                      Review your selected products
                    </p>
                  </div>

                  <span>
                    {totalItems} Items
                  </span>

                </div>


                {/* PRODUCTS */}

                {cart.map((item) => (

                  <div
                    className="cart-product"
                    key={item._id}
                  >

                    {/* IMAGE */}

                    <div className="cart-product-image">

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                    </div>


                    {/* DETAILS */}

                    <div className="cart-product-details">

                      <p className="cart-product-brand">
                        {item.brand || "ShopEasy"}
                      </p>

                      <h5>
                        {item.name}
                      </h5>

                      <p className="cart-description">
                        {item.description}
                      </p>

                      <div className="cart-rating">
                        ⭐ {item.rating || "4.5"}
                      </div>

                      <div className="mobile-price">
                        ₹
                        {Number(item.price) *
                          (item.quantity || 1)}
                      </div>

                    </div>


                    {/* QUANTITY */}

                    <div className="quantity-section">

                      <span className="quantity-label">
                        Quantity
                      </span>

                      <div className="quantity-box">

                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(
                              item._id
                            )
                          }
                        >
                          −
                        </button>

                        <span>
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(
                              item._id
                            )
                          }
                        >
                          +
                        </button>

                      </div>

                    </div>


                    {/* PRICE */}

                    <div className="cart-price">

                      <strong>
                        ₹
                        {Number(item.price) *
                          (item.quantity || 1)}
                      </strong>

                      <small>
                        ₹{item.price} each
                      </small>

                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() =>
                          removeFromCart(
                            item._id
                          )
                        }
                      >
                        🗑 Remove
                      </button>

                    </div>

                  </div>

                ))}

              </div>


              {/* =========================
                  DELIVERY INFO
              ========================= */}

              <div className="delivery-box">

                <div className="delivery-icon">
                  🚚
                </div>

                <div className="delivery-content">

                  <strong>
                    Free Delivery
                  </strong>

                  <p>
                    Free delivery on orders
                    above ₹499
                  </p>

                </div>

                <span className="delivery-check">
                  ✓
                </span>

              </div>


              {/* CONTINUE SHOPPING */}

              <Link
                to="/products"
                className="continue-shopping"
              >
                ← Continue Shopping
              </Link>

            </div>


            {/* =========================
                PRICE SUMMARY
            ========================= */}

            <div className="col-lg-4">

              <div className="price-box">

                <h4>
                  Price Details
                </h4>


                <div className="price-row">

                  <span>
                    Price ({totalItems} items)
                  </span>

                  <span>
                    ₹{totalPrice}
                  </span>

                </div>


                <div className="price-row">

                  <span>
                    Delivery Charges
                  </span>

                  <span
                    className={
                      deliveryCharge === 0
                        ? "free-text"
                        : ""
                    }
                  >
                    {deliveryCharge === 0
                      ? "FREE"
                      : `₹${deliveryCharge}`}
                  </span>

                </div>


                <div className="price-row">

                  <span>
                    Platform Fee
                  </span>

                  <span>
                    FREE
                  </span>

                </div>


                <hr />


                <div className="total-row">

                  <strong>
                    Total Amount
                  </strong>

                  <strong>
                    ₹{finalTotal}
                  </strong>

                </div>


                {/* CHECKOUT */}

                <button
                  type="button"
                  className="checkout-btn"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                  <span>→</span>
                </button>


                <div className="secure-payment">
                  🔒 Secure & Safe Payments
                </div>

              </div>


              {/* BENEFITS */}

              <div className="cart-benefits">

                <div>
                  <span>↩️</span>
                  <div>
                    <strong>
                      Easy Returns
                    </strong>
                    <small>
                      Hassle-free returns
                    </small>
                  </div>
                </div>

                <div>
                  <span>🛡️</span>
                  <div>
                    <strong>
                      Secure Payment
                    </strong>
                    <small>
                      100% secure checkout
                    </small>
                  </div>
                </div>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default Cart;