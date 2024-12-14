const express = require("express");
const router = express();

const todoRoutes = require("./todo.routes");
const authRoutes = require("./auth.routes");

router.use("/auth", authRoutes)
router.use("/todo", todoRoutes);

module.exports = router;