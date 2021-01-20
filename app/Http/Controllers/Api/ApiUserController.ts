import { Request, Response } from "express";
import { User } from "../../../models/User";
import { Controller } from "../Kernel/Controller";

export class ApiUserController extends Controller {
    /**
     * @route /api/v1/users/all
     * Get all user from database
     * @param request 
     * @param response 
     */
    userAll(request : Request, response : Response) {
        User.find(function(err, users) {
            if(err) {
                return response.status(500).send({message : err.message})
            }
            response.send(users)
        })
    }
}