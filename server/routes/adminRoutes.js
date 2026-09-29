const express = require("express");

const {
  getAdminStats,
  getAllOrders,
  updateOrderStatus,
  getAllUsers,
  updateUserRole,
  deleteUser
} = require("../controllers/adminController");

const router = express.Router();


// ================================
// Admin Statistics
// ================================

router.get(
  "/stats",
  getAdminStats
);


// ================================
// Admin Orders
// ================================

router.get(
  "/orders",
  getAllOrders
);

router.put(
  "/orders/:id",
  updateOrderStatus
);


// ================================
// Admin Users
// ================================

router.get(
  "/users",
  getAllUsers
);

router.put(
  "/users/:id",
  updateUserRole
);

router.delete(
  "/users/:id",
  deleteUser
);


module.exports = router;