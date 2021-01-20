import {Request, Response, NextFunction} from 'express'

export interface AbstractMiddleware {
    handle(request : Request, response : Response, next : NextFunction) : void
}