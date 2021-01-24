const { check: body } = require("express-validator")
const { Exception } = require("handlebars")
const mongoose = require("mongoose")

/**
 * 
 * @param {string} key 
 * @param {string} model 
 * @param {string} column 
 */
function exists(key, model, column, message = null) {
    return body(key).custom((value) => {
        return mongoose.model(model).findOne({[column] : value}).then(doc => {
            if(!doc) {
                if(message) throw new Error(message)
                throw new Error( key +" does not exists")
            }
        })
    })
}

function unique(key, model, column, message = null) {
    return body(key).custom(value => {
        return mongoose.model(model).findOne({[column] : value}).then(doc => {
            if(doc) {
                if(message) throw new Error(message)
                throw new Error(key + " already exists")
            }
        })
    })
}

module.exports = {
    exists,
    unique
}