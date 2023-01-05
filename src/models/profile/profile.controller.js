"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.ProfileController = void 0;
var common_1 = require("@nestjs/common");
var access_token_guard_1 = require("../auth/strategies/access-token.guard");
var ProfileController = /** @class */ (function () {
    function ProfileController() {
    }
    ProfileController.prototype.getProfile = function (req) {
        return req.user;
    };
    __decorate([
        (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
        (0, common_1.Get)(),
        __param(0, (0, common_1.Req)())
    ], ProfileController.prototype, "getProfile");
    ProfileController = __decorate([
        (0, common_1.Controller)('profile')
    ], ProfileController);
    return ProfileController;
}());
exports.ProfileController = ProfileController;
