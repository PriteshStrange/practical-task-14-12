const mongoose = require("mongoose");
require("../models");

// find one
const findOne = async (model, where, projection = {}, options = { lean: true }) => {
    return await mongoose.model(model).findOne(where, projection, options)
}

// create one
const createOne = async (model, payload) => {
    return await mongoose.model(model).create(payload);
};

// find all
const findAll = async (model, criteria, projection = {}, options = { lean: true, populate: "" }) => {
    options.lean = true;

    let query = mongoose.model(model).find(criteria, projection, options);

    if (options.populate) query = query.populate(options.populate);
    return await query.exec();
};

//update one
const updateOne = async (model, criteria, dataToSet, options = {}) => {
    options = { lean: true, new: true }

    return await mongoose.model(model).findOneAndUpdate(criteria, dataToSet, options);
};

//update many
const updateMany = async (model, criteria, dataToSet, options = { new: false }) => {
    return await mongoose.model(model).updateMany(criteria, dataToSet, options);
};

//aggregate data
const aggregation = async (model, data) => {
    return await mongoose.model(model).aggregate(data);
};

const isValidObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
};

module.exports = {
    findOne,
    createOne,
    findAll,
    updateOne,
    updateMany,
    aggregation,
    isValidObjectId,
}