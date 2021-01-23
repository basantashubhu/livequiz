import { Controller } from "../Kernel/Controller"
import {Request, Response} from 'express'
import {User} from '../../../models/User'
import jsonwebtoken from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export class ApiUserResourceController extends Controller{

    app_key = process.env.APP_KEY || 'basantashubhu'

    /**
     * @route /api/v1/user/register
     * api user registration
     * @param request 
     * @param response 
     */
    register(request : Request, response : Response) {
        if (!this.validate(request, response)) {
            return;
        }

        const salt = bcrypt.genSaltSync(Number(process.env.SALT || 10))

        const newUser = new User({
            first_name : request.body.first_name,
            last_name : request.body.last_name,
            email : request.body.email,
            password : bcrypt.hashSync(request.body.password, salt)
        })
        newUser.save().then(function(user : any) {
            response.send(user)
        }).catch(function(err) {
            response.status(500).send({message : err.message})
        })
    }

    /**
     * @router /api/v1/user/authenticate
     * api user authentication
     * @param request 
     * @param response 
     */
    authenticate(request : Request, response : Response) {
        if (!this.validate(request, response)) {
            return
        }
        const expiresIn = process.env.TOKEN_EXPIRY || '1hr'

        User.findOne({email : request.body.email}, (err : any, user : any) => {
            if(err) {
                response.status(500).send({message : err.message})
            }
            if(!user || !bcrypt.compareSync(request.body.password, user.password)) {
                return response.status(422).send({errors : {email : "Invalid email address or password"}})
            }
            jsonwebtoken.sign({data : {id: user.id}}, this.app_key, {expiresIn}, function(err : any, token : any) {
                if(err) {
                    return response.status(500).send({message : err.message})
                }
                response.send({ token })
            })
        })
    }

    /**
     * @route /api/v1/token
     * Validate token from body
     * @param request 
     * @param response 
     */
    validateToken(request : Request, response : Response) {
        jsonwebtoken.verify(request.body.token, this.app_key, function(err : any, decoded : any) {
            if (err) {
                response.status(401) // Unauthorized
                if (request.xhr) {
                    response.send({message: 'Please login to contiune'})
                } else {
                    response.redirect('/login', 401)
                }
                return
            }
            response.send({token : request.body.token, decoded})
        })
    }
}