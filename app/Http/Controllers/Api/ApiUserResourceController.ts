import { Controller } from "../Kernel/Controller"
import {Request, Response} from 'express'
import {validationResult} from 'express-validator'
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
        const v = validationResult(request)
        if (!v.isEmpty()) {
            response.status(422).send(v.array())
        }
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
        const token_expiry = process.env.TOKEN_EXPIRY || '1hr'

        const res = {
            "value": request.body.email,
            "msg": "Invalid email address or password",
            "param": "email",
        }
        User.findOne({email : request.body.email}, (err : any, user : any) => {
            if(err) {
                response.status(500).send({message : err.message})
            }
            if(!user || !bcrypt.compareSync(request.body.password, user.password)) {
                return response.status(422).send([res])
            }
            jsonwebtoken.sign({data : {id: user.id}}, this.app_key, {expiresIn : token_expiry}, function(err : any, token : any) {
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