import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [placingOrder, setPlacingOrder] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  // =========================
  // LOAD CART + USER
  // =========================
  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);

    const user =
      JSON.parse(localStorage.getItem("user"));

    const token = localStorage.getItem("token");

    if (!user || !token) {
      alert("Please login before checkout");
      navigate("/login");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      name: user.name || ""
    }));
  }, [navigate]);

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // =========================
  // PRICE CALCULATION
  // =========================
  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  const deliveryCharge =
    totalPrice >= 499 ? 0 : 49;

  const finalTotal =
    totalPrice + deliveryCharge;

  // =========================
  // PLACE ORDER
  // =========================
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const user =
      JSON.parse(localStorage.getItem("user"));

    const token =
      localStorage.getItem("token");

    // User check
    if (!user || !token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    // Cart check
    if (cart.length === 0) {
      alert("Your cart is empty");
      navigate("/products");
      return;
    }

    // Phone validation
    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      alert(
        "Please enter a valid 10 digit mobile number"
      );
      return;
    }

    // Pincode validation
    if (!/^\d{6}$/.test(formData.pincode)) {
      alert(
        "Please enter a valid 6 digit pincode"
      );
      return;
    }

    try {
      setPlacingOrder(true);

      // IMPORTANT:
      // user ID is NOT sent manually.
      // Backend gets user ID from JWT token.
      const orderData = {
        items: cart.map((item) => ({
          product: item._id,
          name: item.name,
          price: Number(item.price),
          quantity: Number(item.quantity),
          image: item.image
        })),

        shippingAddress: {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          pincode: formData.pincode.trim()
        },

        totalAmount: finalTotal,

        paymentMethod: "Cash on Delivery"
      };

      const response = await API.post(
        "/orders",
        orderData
      );

      alert(
        response.data.message ||
        "Order placed successfully!"
      );

      // Clear cart
      localStorage.removeItem("cart");

      // Update Header cart count
      window.dispatchEvent(
        new Event("cartUpdated")
      );

      // Go to My Orders
      navigate("/my-orders");

    } catch (error) {
      console.log(
        "ORDER ERROR:",
        error.response?.data || error
      );

      if (error.response?.status === 401) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        alert(
          "Your session has expired. Please login again."
        );

        navigate("/login");
        return;
      }

      alert(
        error.response?.data?.message ||
        "Order failed. Please try again."
      );

    } finally {
      setPlacingOrder(false);
    }
  };

  // =========================
  // EMPTY CART
  // =========================
  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">

          <div className="checkout-empty">

            <div className="checkout-empty-icon">
              🛒
            </div>

            <h2>
              Your cart is empty
            </h2>

            <p>
              Add some products before
              proceeding to checkout.
            </p>

            <button
              onClick={() =>
                navigate("/products")
              }
            >
              Continue Shopping →
            </button>

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">

      <div className="container">

        {/* =========================
            HEADING
        ========================= */}

        <div className="checkout-heading">

          <span>
            SECURE CHECKOUT
          </span>

          <h1>
            Complete Your Order
          </h1>

          <p>
            Enter your delivery details
            and place your order.
          </p>

        </div>

        <div className="row g-4">

          {/* =========================
              LEFT SIDE
          ========================= */}

          <div className="col-lg-8">

            {/* DELIVERY ADDRESS */}

            <div className="checkout-box">

              <div className="checkout-box-heading">

                <div className="checkout-icon">
                  📍
                </div>

                <div>
                  <h4>
                    Delivery Address
                  </h4>

                  <p>
                    Where should we deliver
                    your order?
                  </p>
                </div>

              </div>

              <form onSubmit={handlePlaceOrder}>

                {/* NAME + PHONE */}

                <div className="row">

                  <div className="col-md-6 mb-3">

                    <label>
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      className="checkout-input"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div className="col-md-6 mb-3">

                    <label>
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      className="checkout-input"
                      placeholder="10 digit mobile number"
                      value={formData.phone}
                      onChange={handleChange}
                      maxLength="10"
                      required
                    />

                  </div>

                </div>

                {/* ADDRESS */}

                <div className="mb-3">

                  <label>
                    Complete Address
                  </label>

                  <textarea
                    name="address"
                    className="checkout-input"
                    rows="3"
                    placeholder="House no, street, area, landmark"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* CITY STATE PINCODE */}

                <div className="row">

                  <div className="col-md-4 mb-3">

                    <label>
                      City
                    </label>

                    <input
                      type="text"
                      name="city"
                      className="checkout-input"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div className="col-md-4 mb-3">

                    <label>
                      State
                    </label>

                    <input
                      type="text"
                      name="state"
                      className="checkout-input"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div className="col-md-4 mb-3">

                    <label>
                      Pincode
                    </label>

                    <input
                      type="text"
                      name="pincode"
                      className="checkout-input"
                      placeholder="6 digit pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      maxLength="6"
                      required
                    />

                  </div>

                </div>

                {/* PAYMENT */}

                <div className="payment-section">

                  <div className="checkout-box-heading">

                    <div className="checkout-icon">
                      💳
                    </div>

                    <div>

                      <h4>
                        Payment Method
                      </h4>

                      <p>
                        Select your preferred
                        payment option.
                      </p>

                    </div>

                  </div>

                  <div className="payment-option">

                    <input
                      type="radio"
                      checked
                      readOnly
                    />

                    <div>

                      <strong>
                        Cash on Delivery
                      </strong>

                      <small>
                        Pay when your order arrives
                      </small>

                    </div>

                    <span>
                      ✓
                    </span>

                  </div>

                </div>

                {/* PLACE ORDER */}

                <button
                  type="submit"
                  className="place-order-btn"
                  disabled={placingOrder}
                >

                  {placingOrder ? (
                    <>
                      <span className="order-spinner"></span>
                      Placing Order...
                    </>
                  ) : (
                    <>
                      Place Order
                      <span>
                        ₹{finalTotal}
                      </span>
                    </>
                  )}

                </button>

              </form>

            </div>

            {/* TRUST INFO */}

            <div className="checkout-trust">

              <div>

                <span>🔒</span>

                <div>

                  <strong>
                    Secure Checkout
                  </strong>

                  <small>
                    Your information is protected
                  </small>

                </div>

              </div>

              <div>

                <span>🚚</span>

                <div>

                  <strong>
                    Fast Delivery
                  </strong>

                  <small>
                    Reliable doorstep delivery
                  </small>

                </div>

              </div>

              <div>

                <span>↩️</span>

                <div>

                  <strong>
                    Easy Returns
                  </strong>

                  <small>
                    Hassle-free return policy
                  </small>

                </div>

              </div>

            </div>

          </div>

          {/* =========================
              RIGHT SIDE
          ========================= */}

          <div className="col-lg-4">

            <div className="checkout-summary">

              <h4>
                Order Summary
              </h4>

              {/* ITEMS */}

              <div className="summary-products">

                {cart.map((item) => (

                  <div
                    className="summary-item"
                    key={item._id}
                  >

                    <div className="summary-image">

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <span>
                        {item.quantity}
                      </span>

                    </div>

                    <div className="summary-product-info">

                      <strong>
                        {item.name}
                      </strong>

                      <small>
                        {item.brand || "ShopEasy"}
                      </small>

                    </div>

                    <span className="summary-item-price">
                      ₹
                      {Number(item.price) *
                        Number(item.quantity)}
                    </span>

                  </div>

                ))}

              </div>

              <hr />

              {/* PRICE */}

              <div className="summary-row">

                <span>
                  Subtotal
                </span>

                <span>
                  ₹{totalPrice}
                </span>

              </div>

              <div className="summary-row">

                <span>
                  Delivery
                </span>

                <span
                  className={
                    deliveryCharge === 0
                      ? "summary-free"
                      : ""
                  }
                >
                  {deliveryCharge === 0
                    ? "FREE"
                    : `₹${deliveryCharge}`}
                </span>

              </div>

              <hr />

              <div className="summary-total">

                <strong>
                  Total Amount
                </strong>

                <strong>
                  ₹{finalTotal}
                </strong>

              </div>

              <div className="summary-secure">
                🔒 Safe & Secure Payments
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;