const mongoose = require("mongoose");
const { todoStatus } = require("../utils/Constant");

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: [todoStatus.pending, todoStatus.completed],
        default: todoStatus.pending,
    },
    reminderTime: { 
        type: Date, 
        required: true 
    },
    remainder: {
        type: Boolean,
        default: true
    },
    addedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model("Todo", todoSchema)