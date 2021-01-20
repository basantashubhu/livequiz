"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuestMiddleware = void 0;
const AbstractMiddleware_1 = require("./AbstractMiddleware");
const LoginController_1 = require("../Controllers/Auth/LoginController");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class GuestMiddleware extends AbstractMiddleware_1.Middleware {
    constructor() {
        super(...arguments);
        this.app_key = process.env.APP_KEY || 'basantashubhu';
    }
    handle(request, response, next) {
        if (request.cookies.token) {
            this.verify(request.cookies.token, request, response, next);
        }
        else if (request.headers.authorization) {
            const token = request.headers.authorization.split(' ')[1];
            this.verify(token, request, response, next);
        }
        else {
            next();
        }
    }
    errorResponse(request, response) {
        if (request.xhr) {
            // response.send({message: 'Please login to contiune'})
        }
        else {
            response.redirect(LoginController_1.LoginController.REDIRECT_URL);
        }
        response.status(400);
        response.end();
    }
    verify(token, request, response, next) {
        jsonwebtoken_1.default.verify(token, this.app_key, (err, decoded) => {
            if (err) {
                // console.log({err:err.message})
                next();
            }
            else {
                this.errorResponse(request, response);
            }
        });
    }
}
exports.GuestMiddleware = GuestMiddleware;
