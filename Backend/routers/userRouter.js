const router = require("express").Router();

const UserController = require("../controller/userController");

// SIGN UP
router.post("/registration", UserController.register);

// LOG IN
router.post("/login", UserController.login);

// Route for getting user information
router.get("/user/:userId", UserController.getUserInfo);

module.exports = router;
