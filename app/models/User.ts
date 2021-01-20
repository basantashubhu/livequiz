import mongoose from 'mongoose'

export const User = mongoose.model('User', new mongoose.Schema({
    first_name : String,
    last_name : String,
    email : String,
    password : String,
    token : {
        type : String,
        required : false
    },
    verifiedAt : Date
}, {
    timestamps : true
}))