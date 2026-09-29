const Order = require("../models/Order");

// =========================
// CREATE ORDER
// =========================
const createOrder = async (req, res) => {
  try {
    const {
      user,
      items,
      shippingAddress,
      totalAmount,
      paymentMethod
    } = req.body;

    // Basic validation
    if (
      !user ||
      !items ||
      items.length === 0 ||
      !shippingAddress ||
      !totalAmount
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required order details"
      });
    }

    const order = await Order.create({
      user,
      items,
      shippingAddress,
      totalAmount,
      paymentMethod:
        paymentMethod || "Cash on Delivery"
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order
    });

  } catch (error) {
    console.log("CREATE ORDER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// =========================
// GET USER ORDERS
// =========================
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.params.userId
    })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      data: orders
    });

  } catch (error) {
    console.log("GET ORDERS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


module.exports = {
  createOrder,
  getUserOrders
};