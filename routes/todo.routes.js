const express = require("express");
const router = express();
const { validRequest, todoValidator } = require("../utils/validations");
const { todoController } = require("../controller");
const { isAuthenticated } = require("../middleware/auth");

router.post("/add", isAuthenticated, validRequest(todoValidator.addTodoValidator), todoController.addTodo);
router.get("/get", isAuthenticated, todoController.getTodoList);
router.put("/edit", isAuthenticated, validRequest(todoValidator.updateTodoValidator), todoController.updateTodo);
router.delete("/today", isAuthenticated, todoController.deleteTodo);
router.post("/change-status",validRequest(todoValidator.changeTodoStatusValidator), isAuthenticated, todoController.changeStatus);

module.exports = router;