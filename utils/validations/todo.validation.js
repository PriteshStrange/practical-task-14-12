const Joi = require("joi");
const { todoStatus } = require("../Constant");

const addTodoValidator = Joi.object({
    title: Joi.string().required().messages({
        "*": "Title is required",
    }),
    description: Joi.string().required().messages({
        "*": "description is required",
    }),
    startDate: Joi.date().required().messages({
        "*": "Start Date is required",
    }),
    endDate: Joi.date().required().messages({
        "*": "End Date is required"
    }),
});

const updateTodoValidator = Joi.object({
    todoId: Joi.string().required().messages({
        "*": "Todo Id is required",
    }),
    title: Joi.string().optional(),
    endDate: Joi.date().optional(),
    description: Joi.string().optional(),
    remainderTime: Joi.string().optional(),
});

const changeTodoStatusValidator = Joi.object({
    todoId: Joi.string().optional().messages({
        "*": "Todo Id is required",
    }),
    status: Joi.string().required().valid(todoStatus.pending, todoStatus.completed),
});


module.exports = { addTodoValidator, updateTodoValidator, changeTodoStatusValidator }