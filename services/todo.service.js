const DAO = require("../DAO");
const { modelName } = require("../utils/Constant");
const { remainderEmail } = require("../utils/emailTemplate");
const moment = require('moment');

const add_todo = async (payload) => {
    try {
        return await DAO.createOne(modelName.TODO, payload)
    } catch (error) {
        return error
    }
}

const get_single_todo = async (query) => {
    try {
        return await DAO.findOne(modelName.TODO, query)
    } catch (error) {
        return error
    }
}

const get_all_todo = async (query) => {
    try {
        const data = await DAO.aggregation(modelName.TODO, [
            { $match: query },
            {
                $project: {
                    updatedAt: 0, __v: 0,
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%d-%m-%Y", date: "$startDate" }
                    },
                    count: { $sum: 1 },
                    todos: { $push: "$$ROOT" },
                },
            },
            { $sort: { "_id": 1 } },
        ]);
        return data;
    } catch (error) {
        return error
    }
}

const update_todo = async (query, payload) => {
    try {
        return await DAO.updateOne(modelName.TODO, query, payload);
    } catch (error) {
        return error
    }
}

const update_many_todo = async (query, payload) => {
    try {
        return await DAO.updateMany(modelName.TODO, query, payload);
    } catch (error) {
        return error
    }
}

const stored_remainder = async (payload) => {
    try {
        return await DAO.createOne(modelName.Remainder, payload)
    } catch (error) {
        return error
    }
}

const scheduleReminder = async (todo, user) => {
    try {
        const currentHour = moment().hour();
        const currentMinute = moment().minute();

        const todoData = await DAO.findAll(modelName.TODO, { status: 'pending', isDeleted: false }, {}, { populate: { path: 'addedBy' } });

        if (todoData?.length) {
            Promise.all(todoData?.map(async (todo) => {
                console.log("todo", todo)
                const reminderHour = moment(todo.reminderTime, 'hh:mm A').hour();
                const reminderMinute = moment(todo.reminderTime, 'hh:mm A').minute();

                if (currentHour === reminderHour && currentMinute === reminderMinute) {
                    if (todo?.addedBy?.email) {
                        await remainderEmail({ email: todo?.addedBy?.email, userName: todo?.addedBy?.userName, title: todo.title, description: todo.description });
                    }
                }
            }));
        }
    } catch (error) {
        return error
    }
};

module.exports = { add_todo, get_single_todo, get_all_todo, update_todo, update_many_todo, stored_remainder, scheduleReminder }