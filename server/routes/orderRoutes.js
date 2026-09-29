const express = require("express");

const {
  createOrder,
  getUserOrders
} = require("../controllers/orderController");

const router = express.Router();


// Place Order
router.post("/", createOrder);


// Get User Orders
router.get("/user/:userId", getUserOrders);


module.exports = router;