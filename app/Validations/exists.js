const { body } = require("express-validator")
const mongoose = require("mongoose")

/**
 * 
 * @param {string} key 
 * @param {string} model 
 * @param {string} column 
 */
function exists(key, model, column) {
    return body(key).custom((value) => {
        return mongoose.model(model).findOne({[column] : value}).then(doc => {
            if(!doc) {
                throw new Error( key +" does not exists")
            }
        })
    })
}

function unique(key, model, column) {
    return body(key).custom(value => {
        return mongoose.model(model).findOne({[column] : value}).then(doc => {
            if(doc) {
                throw new Error(key + " already exists")
            }
        })
    })
}

module.exports = {
    exists,
    unique
}