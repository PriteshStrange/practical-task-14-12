const Joi = require("joi");

const registerValidator = Joi.object({
    userName: Joi.string().required().messages({
        "*": "User Name is required",
    }),
    email: Joi.string().email().required().messages({
        "*": "Please enter valid email",
    }),
    password: Joi.string()
        .min(8)
        .max(30)
        .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        .required()
        .messages({
            "*": "Password must be at least 8 characters long with special chacter",
        }),
});

const loginValidator = Joi.object({
    email: Joi.string().email().required().messages({
        "*": "Please enter valid email",
    }),
    password: Joi.string()
        .min(8)
        .max(30)
        .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        .required()
        .messages({
            "*": "Password must be at least 8 characters long with special chacter",
        }),
});

module.exports = { registerValidator, loginValidator }