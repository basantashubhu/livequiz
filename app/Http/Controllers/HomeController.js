"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeController = void 0;
const Controller_1 = require("./Kernel/Controller");
class HomeController extends Controller_1.Controller {
    constructor() {
        super();
        this.middleware('Auth');
    }
    index(request, response) {
        response.render('index');
    }
}
exports.HomeController = HomeController;
