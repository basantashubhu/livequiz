import { Controller } from "../Kernel/Controller";
import {Request, Response} from 'express'
import { User } from "../../../models/User";
import bcrypt from 'bcryptjs'

export class RegistrationController extends Controller {
    round : any = process.env.SALT || 10

    register(request : Request, response : Response) {
        const salt = bcrypt.genSaltSync(Number(this.round))
        if (!this.validate(request, response)) {
            return
        }
        User.findOne({email : request.body.email}, function(err : any, user : any) {
            if(!user) {
                const user = new User({
                    first_name : request.body.first_name,
                    last_name : request.body.last_name,
                    email : request.body.email,
                    password : bcrypt.hashSync(request.body.password, salt)
                })
                user.save().then(function(done) {
                    response.send({user})
                }).catch(function(err) {
                    response.status(500).send({message: err.message})
                })
            } else {
                response.status(500).send({message: 'User already exists with this email address.'})
            }
        });

        
    }
}