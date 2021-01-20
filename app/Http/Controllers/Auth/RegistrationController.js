"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationController = void 0;
const Controller_1 = require("../Kernel/Controller");
const User_1 = require("../../../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class RegistrationController extends Controller_1.Controller {
    constructor() {
        super(...arguments);
        this.round = process.env.SALT || 10;
    }
    register(request, response) {
        const salt = bcryptjs_1.default.genSaltSync(Number(this.round));
        if (!this.validate(request, response)) {
            return;
        }
        User_1.User.findOne({ email: request.body.email }, function (err, user) {
            if (!user) {
                const user = new User_1.User({
                    first_name: request.body.first_name,
                    last_name: request.body.last_name,
                    email: request.body.email,
                    password: bcryptjs_1.default.hashSync(request.body.password, salt)
                });
                user.save().then(function (done) {
                    response.send({ user });
                }).catch(function (err) {
                    response.status(500).send({ message: err.message });
                });
            }
            else {
                response.status(500).send({ message: 'User already exists with this email address.' });
            }
        });
    }
}
exports.RegistrationController = RegistrationController;
