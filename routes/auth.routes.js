const express = require("express");
const router = express();
const { validRequest, authValidator } = require("../utils/validations");
const { authController } = require("../controller");

router.post("/signup", validRequest(authValidator.registerValidator), authController.signup);
router.post("/login", validRequest(authValidator.loginValidator), authController.login);

module.exports = router;