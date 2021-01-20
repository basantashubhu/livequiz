"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const express_validator_1 = require("express-validator");
const BaseController_1 = require("./BaseController");
class Controller extends BaseController_1.BaseController {
    validate(request, response) {
        const v = express_validator_1.validationResult(request);
        if (!v.isEmpty()) {
            response.status(422).send(v.array()).end();
            return false;
        }
        return true;
    }
}
exports.Controller = Controller;
