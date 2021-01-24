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
    /**
     * @route /api/v1/user/:id [PATCH]
     * Api update user
     * @param request
     * @param response
     */
    updateUser(request, response) {
        User_1.User.findById(request.params.id, function (err, user) {
            if (err)
                return response.status(500).json({ message: err.message });
            if (!user)
                return response.status(404).json({ message: 'User does not exists' });
            const data = [
                ['email', request.body.email],
                ['first_name', request.body.first_name],
                ['last_name', request.body.last_name],
            ].map(x => {
                if (x[1]) {
                    user[x[0]] = x[1];
                }
            });
            user.save().then(() => response.json(user))
                .catch((err) => response.status(500).json({ message: err.message }));
        });
    }
}
exports.ApiUserController = ApiUserController;
