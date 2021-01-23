import { ApiUserController } from "../Api/ApiUserController";
import { ApiUserResourceController } from "../Api/ApiUserResourceController";
import { LoginController } from "../Auth/LoginController";
import { RegistrationController } from "../Auth/RegistrationController";
import { HomeController } from "../HomeController";
import {BaseKernel} from "./BaseKernel";
import { Controller } from "./Controller";
import {ResetPassword} from '../Auth/ResetPassword'

export class Kernel extends BaseKernel{
    private static instance : any = null

    static createInstance() : any {
        if (this.instance == null) {
            this.instance = new this()
        }
        return this.instance
    }
    
    /**
     * @param {String} desiredClassName 
     * @returns {Object} desiredClassObject
     */
    createRelevantClass(desiredClassName : string) : Controller {
        switch(desiredClassName) {
            case 'HomeController' : return HomeController.getInstance()
            case 'LoginController' : return LoginController.getInstance()
            case 'RegistrationController' : return RegistrationController.getInstance()
            case 'ApiUserResourceController' : return ApiUserResourceController.getInstance()
            case 'ApiUserController' : return ApiUserController.getInstance()
            case 'ResetPassword' : return ResetPassword.getInstance()
            default : throw new Error(`Controller [${desiredClassName}] does not exists`);
        }
    }

}