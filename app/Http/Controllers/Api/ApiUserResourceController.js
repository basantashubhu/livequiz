"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiUserResourceController = void 0;
const Controller_1 = require("../Kernel/Controller");
const express_validator_1 = require("express-validator");
const User_1 = require("../../../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class ApiUserResourceController extends Controller_1.Controller {
    /**
     * @route /api/v1/user/register
     * api user registration
     * @param request
     * @param response
     */
    register(request, response) {
        const v = express_validator_1.validationResult(request);
        if (!v.isEmpty()) {
            response.status(422).send(v.array());
        }
    }
    /**
     * @router /api/v1/user/authenticate
     * api user authentication
     * @param request
     * @param response
     */
    authenticate(request, response) {
        if (!this.validate(request, response)) {
            return;
        }
        const app_key = process.env.APP_KEY || 'basantashubhu';
        const token_expiry = process.env.TOKEN_EXPIRY || '1hr';
        const res = {
            "value": request.body.email,
            "msg": "Invalid email address or password",
            "param": "email",
        };
        User_1.User.findOne({ email: request.body.email }, function (err, user) {
            if (err) {
                response.status(500).send({ message: err.message });
            }
            if (!user || !bcryptjs_1.default.compareSync(request.body.password, user.password)) {
                return response.status(422).send([res]);
            }
            jsonwebtoken_1.default.sign({ data: user }, app_key, { expiresIn: token_expiry }, function (err, token) {
                if (err) {
                    return response.status(500).send({ message: err.message });
                }
                response.send({ token });
            });
        });
    }
}
exports.ApiUserResourceController = ApiUserResourceController;
