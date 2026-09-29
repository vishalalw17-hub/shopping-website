import React from "react";
import { Link } from "react-router-dom";

function User() {
  const user =
    JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <div className="container text-center py-5">
        <h3>Please login first</h3>

        <Link
          to="/login"
          className="btn btn-primary mt-3"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="card shadow-sm p-4">

        <h2>👤 My Profile</h2>

        <hr />

        <p>
          <strong>Name:</strong>{" "}
          {user.name}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {user.email}
        </p>

        <p>
          <strong>Role:</strong>{" "}
          {user.role}
        </p>

        <div className="mt-3">


          <Link
            to="/my-orders"
            className="btn btn-primary me-2"
          >
            📦 My Orders
          </Link>

          <Link
            to="/products"
            className="btn btn-outline-primary"
          >
            🛍️ Continue Shopping
          </Link>

        </div>

      </div>

    </div>
  );
}

export default User;