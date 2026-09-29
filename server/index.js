const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();

const app = express();

// MongoDB Connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Product Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);


// Test Route
app.get("/test", (req, res) => {
  res.send("TEST ROUTE WORKING");
});

// Main Route
app.get("/", (req, res) => {
  res.json({
    message: "Shopping Website API is Running"
  });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});