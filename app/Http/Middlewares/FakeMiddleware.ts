import {Request, Response, NextFunction} from "express"
import { AbstractMiddleware } from "./AbstractMiddleware"

export class FakeMiddleware implements AbstractMiddleware{
    handle(request : Request, response : Response, next : NextFunction) {
        next()
    }
}