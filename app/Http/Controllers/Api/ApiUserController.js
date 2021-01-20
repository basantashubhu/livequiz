"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiUserController = void 0;
const User_1 = require("../../../models/User");
const Controller_1 = require("../Kernel/Controller");
class ApiUserController extends Controller_1.Controller {
    /**
     * @route /api/v1/users/all
     * Get all user from database
     * @param request
     * @param response
     */
    userAll(request, response) {
        User_1.User.find(function (err, users) {
            if (err) {
                return response.status(500).send({ message: err.message });
            }
            response.send(users);
        });
    }
}
exports.ApiUserController = ApiUserController;
