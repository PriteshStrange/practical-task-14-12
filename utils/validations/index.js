const { response400 } = require("../../lib/response-handler");

const validRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return response400(res, error?.details?.[0]?.message);
        }
        next();
    };
}

const authValidator = require("./auth.validation");
const todoValidator = require("./todo.validation");

module.exports = { validRequest, todoValidator, authValidator }