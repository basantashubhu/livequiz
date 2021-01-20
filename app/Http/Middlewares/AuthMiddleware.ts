import {Response, Request, NextFunction} from "express"
import { AbstractMiddleware } from "./AbstractMiddleware";
import jwt from "jsonwebtoken"

export class AuthMiddleware implements AbstractMiddleware {
    app_key : string = process.env.APP_KEY || 'basantashubhu'
    
    handle(request : Request, response : Response, next : NextFunction)  {
        if(request.cookies.token) {
            this.verify(request.cookies.token, request, response, next)
        } else if (!request.headers.authorization) {
            this.errorResponse(request, response)
        }  else {
            const token = request.headers.authorization.split(' ')[1]
            this.verify(token, request, response, next)
        }
    }

    verify(token : string, request : Request, response : Response, next : Function) {
        jwt.verify(token, this.app_key, (err, decoded) => {
            if(err) {
                this.errorResponse(request, response, err.message)
            } else {
                request.decoded = decoded
                next()
            }
        })
    }

    errorResponse(request : Request, response : Response, message : string|null = null) {
        if (request.xhr) {
            response.send({message: 'Please login to contiune'})
        } else {
            response.redirect('/login')
        }
        response.status(401)
        response.end()
    }
}