"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteServiceProvider = void 0;
const ServiceProvider_1 = require("./ServiceProvider");
const path_1 = __importDefault(require("path"));
class RouteServiceProvider extends ServiceProvider_1.ServiceProvider {
    boot() { }
    register() {
        this.mapRoutes();
        this.apiRoutes();
    }
    mapRoutes() {
        this.app.use('/', require(path_1.default.join(process.cwd(), 'routes', 'web')));
        // authentication routes
        this.app.use('/', require(path_1.default.join(process.cwd(), 'routes', 'auth', 'route_auth')));
    }
    apiRoutes() {
        this.app.use('/api', require(process.cwd() + '/routes/api/api_route_auth'));
        this.app.use('/api', require(process.cwd() + '/routes/api/api_route_user'));
    }
}
exports.RouteServiceProvider = RouteServiceProvider;
