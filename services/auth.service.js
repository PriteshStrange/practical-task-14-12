const DAO = require("../DAO");
const { modelName } = require("../utils/Constant");

const create_user = async(payload) =>{
    try {
        return await DAO.createOne(modelName.USER, payload)
    } catch (error) {
        return error
    }
}

const find_user = async (query) => {
    try {
        return await DAO.findOne(modelName.USER, query)
    } catch (error) {
        return error
    }
}

module.exports = {create_user, find_user }