import {Request, Response, NextFunction } from "express"
import {AuthMiddleware} from "./AuthMiddleware"
import { FakeMiddleware } from "./FakeMiddleware"
import { TrimString } from "./TrimString"

export abstract class Middleware {
    /**
     * @param {*} request 
     * @param {*} response 
     */
    abstract handle(request : Request, response : Response, next : NextFunction) : void

    /**
     * @param {String} Middleware
     * @return {Function} Function
     */
    static resolve(middleware : string) : Function {
        let middlewareInstance : Middleware = new FakeMiddleware()
        switch(middleware) {
            case 'Auth' : middlewareInstance =  new AuthMiddleware()
            break;
            case 'TrimString' : middlewareInstance = new TrimString()
            break;
        }
        return middlewareInstance.handle.bind(middlewareInstance)
    }
}