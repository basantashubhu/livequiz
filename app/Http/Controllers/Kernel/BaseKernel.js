"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseKernel = void 0;
const Middleware_1 = require("../../Middlewares/Middleware");
class BaseKernel {
    static createInstance() {
        throw new Error("Static method has no implementation");
    }
    /**
    * map string with controllers method
    * @param {String} controllerMethod
    * @returns {Function}
    */
    static map(_controllerMethod) {
        const self = this.createInstance();
        const controllerMethod = _controllerMethod.split('@');
        if (controllerMethod.length < 2) {
            throw "Couldn't map a controller";
        }
        const controller = self.createRelevantClass(controllerMethod[0]);
        const controllerFunction = controllerMethod[1];
        if (!(controllerFunction in controller)) {
            throw `Couldn't find a method [${controllerMethod[1]}] on class [${controllerMethod[0]}]`;
        }
        return self.handle(controller, controllerFunction);
    }
    handle(requestHandler, handlerFunction) {
        const handlerArray = [];
        requestHandler.rules.forEach(rule => {
            handlerArray.push(Middleware_1.Middleware.resolve(rule));
        });
        handlerArray.push(requestHandler.resolve(handlerFunction).bind(requestHandler));
        return handlerArray;
    }
}
exports.BaseKernel = BaseKernel;
