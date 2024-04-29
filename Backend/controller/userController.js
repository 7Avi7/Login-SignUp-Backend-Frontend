const jwt = require("jsonwebtoken");
const UserService = require("../services/userServices");

// Secret key for JWT signing
const secretKey = "your_secret_key_here";

// CREATE A USER
exports.register = async (req, res, next) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Call UserService to register the user
    const successRes = await UserService.registerUser(email, password);

    // Send success response back to the client
    res
      .status(200)
      .json({ message: "User registered successfully", data: successRes });
  } catch (error) {
    // Pass error to the error handling middleware
    next(error);
  }
};

// USER LOGIN
exports.login = async (req, res, next) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // check user
    const user = await UserService.checkUser(email);

    if (!user) {
      throw new Error("User doesn't exist");
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      throw new Error("Invalid Password");
    }

    let tokenData = { _id: user._id, email: user.email };

    // Generate JWT token
    const token = jwt.sign(tokenData, secretKey, {
      expiresIn: "7d",
      algorithm: "HS256",
    });

    res.status(200).json({
      status: true,
      token: token,
    });
  } catch (error) {
    // Pass error to the error handling middleware
    next(error);
  }
};

exports.getUserInfo = async (req, res, next) => {
  try {
    // Extract userId from request parameters
    const userId = req.params.userId;

    // Call UserService to get user information
    const userInfo = await UserService.getUserInfo(userId);

    // Send user information back to the client
    res.status(200).json({
      message: "User information retrieved successfully",
      data: userInfo,
    });
  } catch (error) {
    // Pass error to the error handling middleware
    next(error);
  }
};
