"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthMiddleware {
    constructor() {
        this.app_key = process.env.APP_KEY || 'basantashubhu';
    }
    handle(request, response, next) {
        if (request.cookies.token) {
            this.verify(request.cookies.token, request, response, next);
        }
        else if (!request.headers.authorization) {
            this.errorResponse(request, response);
        }
        else {
            const token = request.headers.authorization.split(' ')[1];
            this.verify(token, request, response, next);
        }
    }
    verify(token, request, response, next) {
        jsonwebtoken_1.default.verify(token, this.app_key, (err, decoded) => {
            if (err) {
                this.errorResponse(request, response, err.message);
            }
            else {
                request.decoded = decoded;
                next();
            }
        });
    }
    errorResponse(request, response, message = null) {
        if (request.xhr) {
            response.send({ message: 'Please login to contiune' });
        }
        else {
            response.redirect('/login');
        }
        response.status(401);
        response.end();
    }
}
exports.AuthMiddleware = AuthMiddleware;
