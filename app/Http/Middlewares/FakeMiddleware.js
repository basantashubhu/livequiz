"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeMiddleware = void 0;
class FakeMiddleware {
    handle(request, response, next) {
        next();
    }
}
exports.FakeMiddleware = FakeMiddleware;
