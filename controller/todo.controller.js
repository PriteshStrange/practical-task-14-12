const { response400, response200, response201 } = require("../lib/response-handler");
const catchAsyncError = require("../middleware/catchAsyncError");
const { todoService } = require("../services");
const { msg } = require("../utils/Constant");
const { isValidObjectId } = require("mongoose");

const addTodo = catchAsyncError(async (req, res) => {
    const userId = req.user;
    const { startDate, endDate } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start < today) {
        return response400(res, msg.startDateError);
    }

    if (end < today) {
        return response400(res, msg.endDateError);
    }

    req.body.addedBy = userId;
    const todo = await todoService.add_todo(req.body);

    return response201(res, msg.todoCreated, [])
});

const getTodoList = catchAsyncError(async (req, res) => {
    const userId = req.user;
    const { date } = req.query;

    const matchQuery = {
        addedBy: userId,
        isDeleted: false,
    };

    if (date) {
        const targetDate = new Date(date);
        targetDate.setHours(0, 0, 0, 0);
        const nextDate = new Date(targetDate);
        nextDate.setDate(targetDate.getDate() + 1);

        matchQuery.startDate = {
            $gte: targetDate,
            $lt: nextDate
        };
    }

    const data = await todoService.get_all_todo(matchQuery)

    return response200(res, msg.fetch, data);
});

const updateTodo = catchAsyncError(async (req, res) => {
    const { todoId, endDate } = req.body;
    if (!isValidObjectId(todoId)) return response400(res, msg.invalidId);

    const targetDate = new Date();
    targetDate.setHours(0, 0, 0, 0);
    const nextDate = new Date(targetDate);
    nextDate.setDate(targetDate.getDate() + 1);

    const todoData = await todoService.get_single_todo({ _id: todoId, isDeleted: false, startDate: { $gte: targetDate, $lt: nextDate }, });
    if (!todoData) return response400(res, msg.todoNotFound);

    if (endDate) {
        const end = new Date(endDate);
        if (end < targetDate) {
            return response400(res, msg.endDateError);
        }
    }

    await todoService.update_todo({ _id: todoId }, req.body);

    return response200(res, msg.updateSuccess, []);
});

const deleteTodo = catchAsyncError(async (req, res) => {
    const targetDate = new Date();
    targetDate.setHours(0, 0, 0, 0);
    const nextDate = new Date(targetDate);
    nextDate.setDate(targetDate.getDate() + 1);

    const deleteTodayTodo = await todoService.update_many_todo({ isDeleted: false, startDate: { $gte: targetDate, $lt: nextDate }, }, { isDeleted: true })

    if (!deleteTodayTodo.modifiedCount) {
        return response400(res, msg.noMoreTodo)
    }

    return response200(res, msg.deleteSuccess, []);
});

const changeStatus = catchAsyncError(async (req, res) => {
    const { todoId, status } = req.body;
    if (!isValidObjectId(todoId)) return response400(res, msg.invalidId);

    const todoData = await todoService.get_single_todo({ _id: todoId, isDeleted: false });
    if (!todoData) return response400(res, msg.todoNotFound);

    await todoService.update_todo({ _id: todoId }, { status });

    return response200(res, msg.updateSuccess, []);
});

const addRemainder = catchAsyncError(async (req, res) => {
    const userId = req.user;
    const { todoId, remainderTime } = req.body;
    const todoData = await todoService.get_single_todo({ _id: todoId, isDeleted: false });
    if (!todoData) return response400(res, msg.todoNotFound);

    if (!isValidObjectId(todoId)) return response400(res, msg.invalidId);
    await todoService.stored_remainder({ todoId, remainderTime, userId });


    return response200(res, msg.remainderAdded);
})

module.exports = { addTodo, getTodoList, updateTodo, deleteTodo, changeStatus, addRemainder }