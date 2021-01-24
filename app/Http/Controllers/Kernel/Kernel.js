"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kernel = void 0;
const ApiUserController_1 = require("../Api/ApiUserController");
const ApiUserResourceController_1 = require("../Api/ApiUserResourceController");
const LoginController_1 = require("../Auth/LoginController");
const RegistrationController_1 = require("../Auth/RegistrationController");
const HomeController_1 = require("../HomeController");
const BaseKernel_1 = require("./BaseKernel");
const ResetPassword_1 = require("../Auth/ResetPassword");
const ApiResetPasswordController_1 = require("../Api/ApiResetPasswordController");
class Kernel extends BaseKernel_1.BaseKernel {
    /**
     * @param {String} desiredClassName
     * @returns {Object} desiredClassObject
     */
    createRelevantClass(desiredClassName) {
        switch (desiredClassName) {
            case 'HomeController': return HomeController_1.HomeController.getInstance();
            case 'LoginController': return LoginController_1.LoginController.getInstance();
            case 'RegistrationController': return RegistrationController_1.RegistrationController.getInstance();
            case 'ApiUserResourceController': return ApiUserResourceController_1.ApiUserResourceController.getInstance();
            case 'ApiUserController': return ApiUserController_1.ApiUserController.getInstance();
            case 'ResetPassword': return ResetPassword_1.ResetPassword.getInstance();
            case 'ApiResetPasswordController': return ApiResetPasswordController_1.ApiResetPasswordController.getInstance();
            default: throw new Error(`Controller [${desiredClassName}] does not exists`);
        }
    }
}
exports.Kernel = Kernel;
