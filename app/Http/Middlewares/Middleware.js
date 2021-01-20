"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = void 0;
const AuthMiddleware_1 = require("./AuthMiddleware");
const FakeMiddleware_1 = require("./FakeMiddleware");
const TrimString_1 = require("./TrimString");
class Middleware {
    /**
     * @param {String} Middleware
     * @return {Function} Function
     */
    static resolve(middleware) {
        let middlewareInstance = new FakeMiddleware_1.FakeMiddleware();
        switch (middleware) {
            case 'Auth':
                middlewareInstance = new AuthMiddleware_1.AuthMiddleware();
                break;
            case 'TrimString':
                middlewareInstance = new TrimString_1.TrimString();
                break;
        }
        return middlewareInstance.handle.bind(middlewareInstance);
    }
}
exports.Middleware = Middleware;
