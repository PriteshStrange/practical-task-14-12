const catchAsyncError = require("../middleware/catchAsyncError");
const { authService } = require("../services");
const { create_token, msg, validPassword, hashPassword } = require("../utils/Constant");
const { response400, response200, response201, response404 } = require("../lib/response-handler");

const signup = catchAsyncError(async (req, res) => {
    const { userName,email, password } = req.body;
    const name = userName.toLowerCase();

    const userExists = await authService.find_user({ userName: name, isDeleted: false });
    if (userExists) return response400(res, msg.userExists);

    const userEmailExists = await authService.find_user({ email, isDeleted: false });
    if (userEmailExists) return response400(res, msg.emailExists);

    const encryptedPassword = await hashPassword(password);

    await authService.create_user({ userName: name,email, password: encryptedPassword });

    return response201(res, msg.registerSuccess, []);
});

const login = catchAsyncError(async (req, res) => {
    const { email, password } = req.body;

    const userData = await authService.find_user({ email, isDeleted: false });
    if (!userData) return response404(res, msg.userNotExists);

    if (!validPassword(password, userData.password)) return response400(res, msg.invalidPassword);

    const token = create_token(userData);

    return response200(res, msg.fetch, token);
});

module.exports = { signup, login }