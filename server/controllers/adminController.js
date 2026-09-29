const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");


// =====================================
// Admin Statistics
// =====================================

const getAdminStats = async (req, res) => {
  try {
    const totalUsers =
      await User.countDocuments();

    const totalProducts =
      await Product.countDocuments();

    const totalOrders =
      await Order.countDocuments();

    const salesResult =
      await Order.aggregate([
        {
          $group: {
            _id: null,
            totalSales: {
              $sum: "$totalAmount"
            }
          }
        }
      ]);

    const totalSales =
      salesResult.length > 0
        ? salesResult[0].totalSales
        : 0;

    res.json({
      success: true,
      data: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalSales
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// =====================================
// Get All Orders
// =====================================

const getAllOrders = async (req, res) => {
  try {

    const orders =
      await Order.find()
        .populate(
          "user",
          "name email"
        )
        .populate(
          "items.product"
        )
        .sort({
          createdAt: -1
        });

    res.json({
      success: true,
      count: orders.length,
      data: orders
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// =====================================
// Update Order Status
// =====================================

const updateOrderStatus = async (req, res) => {
  try {

    const {
      orderStatus
    } = req.body;

    const order =
      await Order.findByIdAndUpdate(
        req.params.id,
        {
          orderStatus
        },
        {
          new: true,
          runValidators: true
        }
      );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.json({
      success: true,
      message:
        "Order status updated successfully",
      data: order
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// =====================================
// Get All Users
// =====================================

const getAllUsers = async (req, res) => {
  try {

    const users =
      await User.find()
        .select("-password")
        .sort({
          createdAt: -1
        });

    res.json({
      success: true,
      count: users.length,
      data: users
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// =====================================
// Update User Role
// =====================================

const updateUserRole = async (req, res) => {
  try {

    const {
      role
    } = req.body;

    // Check valid role
    if (
      !["user", "admin"].includes(role)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid role"
      });
    }

    const user =
      await User.findByIdAndUpdate(
        req.params.id,
        {
          role
        },
        {
          new: true,
          runValidators: true
        }
      ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      message:
        "User role updated successfully",
      data: user
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// =====================================
// Delete User
// =====================================

const deleteUser = async (req, res) => {
  try {

    const user =
      await User.findByIdAndDelete(
        req.params.id
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      message:
        "User deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// =====================================
// Export Controllers
// =====================================

module.exports = {
  getAdminStats,
  getAllOrders,
  updateOrderStatus,
  getAllUsers,
  updateUserRole,
  deleteUser
};