import {Request, Response, NextFunction} from 'express'

interface AbstractMiddlewareInterface {
    handle(request : Request, response : Response, next : NextFunction) : void
}

export abstract class AbstractMiddleware implements AbstractMiddlewareInterface{

    abstract handle(request : Request, response : Response, next : NextFunction) : void

}

export class Middleware extends AbstractMiddleware{
    private static instance: any

    static getInstance(): any {
        if (this.instance == null) {
            this.instance = new this()
        }
        return this.instance
    }

    handle(request: Request, response: Response, next: NextFunction): void {
    }

}