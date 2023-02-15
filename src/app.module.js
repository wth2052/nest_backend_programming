"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var users_controller_1 = require("./users/users.controller");
var users_module_1 = require("./users/users.module");
var api_controller_1 = require("./api/api.controller");
var email_service_1 = require("./email/email.service");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [users_module_1.UsersModule],
            controllers: [app_controller_1.AppController, users_controller_1.UsersController, api_controller_1.ApiController],
            providers: [app_service_1.AppService, email_service_1.EmailService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
