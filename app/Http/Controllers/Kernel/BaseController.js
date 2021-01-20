"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
class BaseController {
    constructor() {
        this.rules = [];
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new this();
        }
        return this.instance;
    }
    middleware(...middlewares) {
        middlewares.forEach(rule => this.rules.push(rule));
    }
    resolve(method) {
        return this[method];
    }
}
exports.BaseController = BaseController;
