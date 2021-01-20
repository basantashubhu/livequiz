"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = exports.AbstractMiddleware = void 0;
class AbstractMiddleware {
}
exports.AbstractMiddleware = AbstractMiddleware;
class Middleware extends AbstractMiddleware {
    static getInstance() {
        if (this.instance == null) {
            this.instance = new this();
        }
        return this.instance;
    }
    handle(request, response, next) {
    }
}
exports.Middleware = Middleware;
