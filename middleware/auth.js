const { response401 } = require("../lib/response-handler");
const { authService } = require("../services");
const { verifyToken, msg } = require("../utils/Constant");
const catchAsyncError = require("./catchAsyncError");

const isAuthenticated = catchAsyncError(async (req, res,next) => {

    const header = req.headers.authorization;
    if (!header) return response401(res, msg.headerMissing);

    const token = header.split(" ")[1];
    if (!token) return response401(res, msg.invalidToken);

    const data = await verifyToken(token);
    if (!data) return response401(res, msg.invalidToken);

    const userData = await authService.find_user({ _id: data.user_id, });

    if (!userData) return response401(res, msg.tokenExpired);

    req.user = userData._id;
    next();
});

module.exports = { isAuthenticated }