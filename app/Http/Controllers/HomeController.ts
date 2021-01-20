import {Request, Response} from "express"
import { Controller } from "./Kernel/Controller";

export class HomeController extends Controller{
    constructor() {
        super()
        this.middleware('Auth')
    }
    index(request : Request, response : Response) {
        response.render('index')
    }
}