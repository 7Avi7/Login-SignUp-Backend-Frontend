const UserModel = require("../model/userModel");
const jwt = require("jsonwebtoken");

// POST Users (Create)
const registerUser = async (email, password) => {
  try {
    const createUser = new UserModel({ email, password });
    return await createUser.save();
  } catch (err) {
    throw err; // Removed extra newline
  }
};

// Static method to check if user exists
const checkUser = async (email) => {
  try {
    return await UserModel.findOne({ email }); // Corrected to findOne
  } catch (error) {
    throw error;
  }
};

// Static method to Generate Token
// const generateToken = async (tokenData, secretKey, jwt_expire) => {
//   try {
//     // Sign the token with provided data, secret key, and expiration time
//     return jwt.sign(tokenData, secretKey, { expiresIn: jwt_expire });
//   } catch (error) {
//     // If an error occurs during token generation, throw it
//     throw error;
//   }
// };

// GET Users
const getUserInfo = async (userId) => {
  const userInfo = await UserModel.findById(userId).select("-password");

  if (!userInfo) {
    throw new Error("User not found");
  }

  return userInfo;
};

module.exports = {
  registerUser,
  checkUser,
  getUserInfo,
};
