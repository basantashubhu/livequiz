import {Request, Response, NextFunction } from "express"
import {AuthMiddleware} from "./AuthMiddleware"
import { FakeMiddleware } from "./FakeMiddleware"
import { TrimString } from "./TrimString"
import {GuestMiddleware} from './GuestMiddleware'

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
        let middlewareInstance : Middleware = FakeMiddleware.getInstance()
        switch(middleware) {
            case 'Auth' : middlewareInstance =  AuthMiddleware.getInstance()
            break;
            case 'TrimString' : middlewareInstance = TrimString.getInstance()
            break;
            case 'Guest' : middlewareInstance = GuestMiddleware.getInstance()
        }
        return middlewareInstance.handle.bind(middlewareInstance)
    }
}