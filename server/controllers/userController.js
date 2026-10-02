const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================================
// Register User
// ================================

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required"
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.log("Register Error:", error);

    res.status(500).json({
      success: false,
      message: "Registration failed"
    });
  }
};


// ================================
// Login User
// ================================

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // ==========================================
    // Check password
    // ==========================================

    let isPasswordMatch = false;

    // Check whether password is already bcrypt hashed
    const isBcryptPassword =
      user.password.startsWith("$2a$") ||
      user.password.startsWith("$2b$") ||
      user.password.startsWith("$2y$");

    if (isBcryptPassword) {

      // New bcrypt password
      isPasswordMatch = await bcrypt.compare(
        password,
        user.password
      );

    } else {

      // ==========================================
      // Old plaintext password
      // ==========================================

      isPasswordMatch = user.password === password;

      // If old password is correct,
      // automatically convert it to bcrypt
      if (isPasswordMatch) {

        user.password = await bcrypt.hash(
          password,
          10
        );

        await user.save();

        console.log(
          `Password migrated to bcrypt for: ${user.email}`
        );
      }
    }

    // Password incorrect
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // ==========================================
    // Create JWT Token
    // ==========================================

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    // ==========================================
    // Login Response
    // ==========================================

    res.json({
      success: true,
      message: "Login successful",
      token,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.log("Login Error:", error);

    res.status(500).json({
      success: false,
      message: "Login failed"
    });
  }
};


// ================================
// Export
// ================================

module.exports = {
  registerUser,
  loginUser
};