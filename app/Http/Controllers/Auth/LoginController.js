"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const Controller_1 = require("../Kernel/Controller");
const User_1 = require("../../../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class LoginController extends Controller_1.Controller {
    constructor() {
        super(...arguments);
        this.app_key = process.env.APP_KEY || 'basantashubhu';
        this.algorithm = process.env.ENC || 'HS256';
    }
    loginPage(request, response) {
        response.render('auth/login');
    }
    login(request, response) {
        User_1.User.findOne({ email: request.body.email }, (err, user) => {
            if (err) {
                return response.status(422).send({ message: err.message });
            }
            if (!user || !bcryptjs_1.default.compareSync(request.body.password, user.password)) {
                return response.status(404).send({ message: 'Incorrect username or password. Please try again.' });
            }
            jsonwebtoken_1.default.sign({ data: user }, this.app_key, { expiresIn: '1min' }, function (err, token) {
                if (err) {
                    return response.status(500).send({ message: err.message });
                }
                request.cookies.token = token;
                response.send({ token });
            });
        });
    }
}
exports.LoginController = LoginController;
