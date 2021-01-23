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
        verifiedAt : {
            type : Date,
            required : false
        }
    }, 
    {
        timestamps : true,
    }
);

UserSchema.methods.findByEmail = function(this : any) {
    return this.model('User').findOne({email : this.email})
}

export const User = mongoose.model('User', UserSchema)