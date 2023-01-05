"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var constants_1 = require("./constants");
var argon2 = require("argon2");
var AuthService = /** @class */ (function () {
    function AuthService(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    AuthService.prototype.validateUser = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, password_1, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersService.getUser({ email: email })];
                    case 1:
                        user = _a.sent();
                        if (user && user.password === password) {
                            password_1 = user.password, result = __rest(user, ["password"]);
                            return [2 /*return*/, result];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    AuthService.prototype.login = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var id, payload, _a, accessToken, refreshToken, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        id = user.id;
                        payload = {
                            sub: id,
                            username: user.email,
                            createdAt: user.created_at,
                            updatedAt: user.updated_at
                        };
                        _c = (_b = Promise).all;
                        _d = [this.jwtService.signAsync(payload, {
                                secret: constants_1.jwtConstants.accessSecret,
                                expiresIn: '15m'
                            })];
                        return [4 /*yield*/, this.jwtService.signAsync(payload, {
                                secret: constants_1.jwtConstants.refreshSecret,
                                expiresIn: '7d'
                            })];
                    case 1: return [4 /*yield*/, _c.apply(_b, [_d.concat([
                                _e.sent()
                            ])])];
                    case 2:
                        _a = _e.sent(), accessToken = _a[0], refreshToken = _a[1];
                        return [4 /*yield*/, this.updateRefreshToken(id, refreshToken)];
                    case 3:
                        _e.sent();
                        return [2 /*return*/, {
                                access_token: accessToken,
                                refresh_token: refreshToken
                            }];
                }
            });
        });
    };
    AuthService.prototype.updateRefreshToken = function (id, refreshToken) {
        return __awaiter(this, void 0, void 0, function () {
            var hashedRefreshToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.hashData(refreshToken)];
                    case 1:
                        hashedRefreshToken = _a.sent();
                        return [4 /*yield*/, this.usersService.updateUser({
                                where: {
                                    id: id
                                },
                                data: {
                                    refresh_token: hashedRefreshToken
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.refreshTokens = function (id, refreshToken) {
        return __awaiter(this, void 0, void 0, function () {
            var user, refreshTokenMatches, tokens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersService.getUser({ id: id })];
                    case 1:
                        user = _a.sent();
                        if (!user || !user.refresh_token)
                            throw new common_1.UnauthorizedException();
                        return [4 /*yield*/, argon2.verify(user.refresh_token, refreshToken)];
                    case 2:
                        refreshTokenMatches = _a.sent();
                        if (!refreshTokenMatches)
                            throw new common_1.UnauthorizedException();
                        return [4 /*yield*/, this.login(user)];
                    case 3:
                        tokens = _a.sent();
                        return [4 /*yield*/, this.updateRefreshToken(user.id, tokens.refresh_token)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, tokens];
                }
            });
        });
    };
    AuthService.prototype.hashData = function (data) {
        return argon2.hash(data);
    };
    AuthService = __decorate([
        (0, common_1.Injectable)()
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
