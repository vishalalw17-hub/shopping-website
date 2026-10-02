const Order = require("../models/Order");

// =========================
// CREATE ORDER
// =========================
const createOrder = async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      totalAmount,
      paymentMethod
    } = req.body;

    // User ID comes from verified JWT
    const userId = req.user.id;

    // Basic validation
    if (
      !items ||
      items.length === 0 ||
      !shippingAddress ||
      totalAmount === undefined ||
      totalAmount === null
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required order details"
      });
    }

    const order = await Order.create({
      user: userId,
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
    // Use logged-in user's ID from JWT
    const userId = req.user.id;

    const orders = await Order.find({
      user: userId
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