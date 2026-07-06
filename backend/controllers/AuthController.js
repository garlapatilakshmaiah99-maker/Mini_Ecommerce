const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SIGNUP
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "user"
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Signup successful",
      user: newUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};

// USER LOGIN
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User Not Found"
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password"
      });
    }

    if (existingUser.role !== "user") {
      return res.status(403).json({
        success: false,
        message: "Only users can login here"
      });
    }

    const userToken = jwt.sign(
      {
        id: existingUser._id,
        role: existingUser.role
      },                                    //jwt 
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "User Login Successful",
      user: existingUser,
      userToken
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};

// ADMIN LOGIN
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingAdmin = await User.findOne({ email });

    if (!existingAdmin) {
      return res.status(404).json({
        success: false,
        message: "Admin Not Found"
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingAdmin.password
    );

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password"
      });
    }

    if (existingAdmin.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can login here"
      });
    }

    const adminToken = jwt.sign(
      {
        id: existingAdmin._id,
        role: existingAdmin.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Admin Login Successful",
      admin: existingAdmin,
      adminToken
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};


const logout = async (req, res) => {               // logout
  try {
    res.status(200).json({
      success: true,
      message: "Logout Successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
module.exports = {
  signup,
  userLogin,
  adminLogin,
  logout,
};