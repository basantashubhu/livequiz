import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
    {
        first_name : {
            type : String,
            required : true
        },
        last_name : {
            type : String,
            required : true
        },
        email : {
            type : String,
            required : true,
            unique : true
        },
        password : {
            type : String,
            required : true
        },
        token : {
            type : String,
            required : false
        },
        code : {
            type : Number,
            required : false
        },
        verifiedAt : {
            type : Date,
            required : false
        }
    }, 
    {
        timestamps : true,
    }
);

export const User = mongoose.model('User', UserSchema)