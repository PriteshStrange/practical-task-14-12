const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");

const modelName = {
    USER: 'User',
    TODO: "Todo",
}

const todoStatus = {
    pending: "pending",
    completed: "completed"
}

const msg = {
    invalidId:"Invalid Id",
    userExists: "User is already registered",
    fetch: "Fetched successfully",
    emailExists: "Email is already exists",
    updateSuccess: "Update successfully",
    deleteSuccess: "Deleted successfully",
    registerSuccess: "Registered successfully",
    loginSuccess: "Login successfully",
    userNotExists: "Please enter valid credentials",
    invalidPassword: "Please enter valid credentials",
    headerMissing: "Missing headers",
    invalidToken: "Invalid token",
    tokenExpired: "Token expired or invalid",
    todoCreated: "Todo added successfully",
    startDateError: "Start date must be equal to greater than today",
    endDateError: "End date must be equal to greater than today",
    todoNotFound: "Todo details not found",
    noMoreTodo: "You have no more tasks for today",
    remainderAdded:"Remainder added successfully",
}

const hashPassword = (password) => {
    return bcrypt.hash(password, 10);
}

const validPassword = (inputPassword, storedPassword) => {
    return bcrypt.compare(inputPassword, storedPassword);
}

const create_token = (userData) => {
    const data = { user_id: userData._id, }
    const token = Jwt.sign(data, process.env.JWT_SEC);
    return token
}

const verifyToken = async (token) => {
    return new Promise((resolve, reject) => {
        Jwt.verify(token, process.env.JWT_SEC, (err, result) => {
            if (err) return resolve(null)
            resolve(result)
        });
    });
}

module.exports = { modelName, msg, todoStatus, hashPassword, validPassword, create_token, verifyToken }