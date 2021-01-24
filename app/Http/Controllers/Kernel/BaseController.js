"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const Singleton_1 = require("./Singleton");
class BaseController extends Singleton_1.Singleton {
    constructor() {
        super();
        this.rules = [];
    }
    middleware(...middlewares) {
        middlewares.forEach(rule => this.rules.push(rule));
    }
    resolve(method) {
        return this[method];
    }
}
exports.BaseController = BaseController;
