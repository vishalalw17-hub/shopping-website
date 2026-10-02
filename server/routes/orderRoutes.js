const express = require("express");

const {
  createOrder,
  getUserOrders
} = require("../controllers/orderController");

const {
  authMiddleware
} = require("../middleware/authMiddleware");

const router = express.Router();


// =========================
// AUTHENTICATION
// =========================

router.use(authMiddleware);


// =========================
// PLACE ORDER
// =========================

router.post("/", createOrder);


// =========================
// GET MY ORDERS
// =========================

router.get("/my-orders", getUserOrders);


module.exports = router;