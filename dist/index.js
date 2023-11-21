var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
export var RobloxProvider = function (options) {
    var CLIENT_ID = options.clientId, CLIENT_SECRET = options.clientSecret, SCOPES = options.scopes, REDIRECT_URI = options.redirectUri, _a = options.checks, CHECKS = _a === void 0 ? ['pkce', 'state'] : _a, REST = options.rest;
    return __assign({ clientId: CLIENT_ID, clientSecret: CLIENT_SECRET, id: 'roblox', name: 'Roblox', type: 'oauth', wellKnown: 'https://apis.roblox.com/oauth/.well-known/openid-configuration', authorization: { params: { scope: SCOPES.join(' '), redirect_uri: REDIRECT_URI } }, idToken: true, checks: CHECKS, client: {
            authorization_signed_response_alg: 'ES256',
            id_token_signed_response_alg: 'ES256',
        }, profile: function (profile) {
            return {
                type: 'roblox',
                id: profile.sub,
                robloxId: profile.sub,
                name: profile.preferred_username,
                displayName: profile.nickname,
                picture: profile.picture
            };
        } }, REST);
};
export var RobloxProviderJwtCallback = function (token, user) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (!user)
            return [2 /*return*/, token];
        if (!((user === null || user === void 0 ? void 0 : user.type) === 'roblox'))
            return [2 /*return*/, token];
        token.id = user.id;
        token.robloxId = user.robloxId;
        token.name = user.name,
            token.displayName = user.displayName;
        token.picture = user.picture;
        token.type = "roblox";
        return [2 /*return*/, token];
    });
}); };
export var RobloxProviderSessionCallback = function (session, tokenOrUser) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (!((tokenOrUser === null || tokenOrUser === void 0 ? void 0 : tokenOrUser.type) === 'roblox'))
            return [2 /*return*/, session];
        session.user.id = tokenOrUser.id;
        session.user.robloxId = tokenOrUser.robloxId;
        session.user.name = tokenOrUser.name;
        session.user.displayName = tokenOrUser.displayName;
        session.user.picture = tokenOrUser.picture;
        return [2 /*return*/, session];
    });
}); };
export var RobloxProviderCallbacks_Jwt = {
    jwt: function (_a) {
        var token = _a.token, user = _a.user;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, RobloxProviderJwtCallback(token, user)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
    session: function (_a) {
        var session = _a.session, token = _a.token;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, RobloxProviderSessionCallback(session, token)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
};
export var RobloxProviderCallbacks_Database = {
    session: function (_a) {
        var session = _a.session, user = _a.user;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, RobloxProviderSessionCallback(session, user)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
};
