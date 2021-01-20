import {Middleware} from './AbstractMiddleware'
import e, {Request, Response} from 'express'
import {LoginController} from '../Controllers/Auth/LoginController'
import jwt from 'jsonwebtoken'

export class GuestMiddleware extends Middleware {

    app_key : string = process.env.APP_KEY || 'basantashubhu'

    handle(request: e.Request, response: e.Response, next: e.NextFunction): void {
        if(request.cookies.token) {
            this.verify(request.cookies.token, request, response, next)
        } else if (request.headers.authorization) {
            const token = request.headers.authorization.split(' ')[1]
            this.verify(token, request, response, next)
        }  else {
            next()
        }
    }


    errorResponse(request: e.Request, response: e.Response) {
        if (request.xhr) {
            // response.send({message: 'Please login to contiune'})
        } else {
            response.redirect(LoginController.REDIRECT_URL)
        }
        response.status(400)
        response.end()
    }

    verify(token : string, request : Request, response : Response, next : Function) {
        jwt.verify(token, this.app_key, (err, decoded) => {
            if(err) {
                // console.log({err:err.message})
                next()
            } else {
                this.errorResponse(request, response)
            }
        })
    }
}