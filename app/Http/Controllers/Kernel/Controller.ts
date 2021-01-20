import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { BaseController } from "./BaseController";


export class Controller extends BaseController{
    validate(request : Request, response : Response) : boolean{
        const v = validationResult(request)
        if(!v.isEmpty()) {
            response.status(422).send(v.array()).end()
            return false
        }

        return true
    }
}