"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RobloxProviderCallbacks_Database = exports.RobloxProviderCallbacks_Jwt = exports.RobloxProviderSessionCallback = exports.RobloxProviderJwtCallback = exports.RobloxProvider = void 0;
const RobloxProvider = (options) => {
    const { clientId: CLIENT_ID, clientSecret: CLIENT_SECRET, scopes: SCOPES, redirectUri: REDIRECT_URI, checks: CHECKS = ['pkce', 'state'], rest: REST, } = options;
    return Object.assign({ clientId: CLIENT_ID, clientSecret: CLIENT_SECRET, id: 'roblox', name: 'Roblox', type: 'oauth', wellKnown: 'https://apis.roblox.com/oauth/.well-known/openid-configuration', authorization: { params: { scope: SCOPES.join(' '), redirect_uri: REDIRECT_URI } }, idToken: true, checks: CHECKS, client: {
            authorization_signed_response_alg: 'ES256',
            id_token_signed_response_alg: 'ES256',
        }, profile(profile) {
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
exports.RobloxProvider = RobloxProvider;
const RobloxProviderJwtCallback = (token, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user)
        return token;
    if (!((user === null || user === void 0 ? void 0 : user.type) === 'roblox'))
        return token;
    token.id = user.id;
    token.robloxId = user.robloxId;
    token.name = user.name,
        token.displayName = user.displayName;
    token.picture = user.picture;
    token.type = "roblox";
    return token;
});
exports.RobloxProviderJwtCallback = RobloxProviderJwtCallback;
const RobloxProviderSessionCallback = (session, tokenOrUser) => __awaiter(void 0, void 0, void 0, function* () {
    if (!((tokenOrUser === null || tokenOrUser === void 0 ? void 0 : tokenOrUser.type) === 'roblox'))
        return session;
    session.user.id = tokenOrUser.id;
    session.user.robloxId = tokenOrUser.robloxId;
    session.user.name = tokenOrUser.name;
    session.user.displayName = tokenOrUser.displayName;
    session.user.picture = tokenOrUser.picture;
    return session;
});
exports.RobloxProviderSessionCallback = RobloxProviderSessionCallback;
exports.RobloxProviderCallbacks_Jwt = {
    jwt({ token, user }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, exports.RobloxProviderJwtCallback)(token, user);
        });
    },
    session({ session, token }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, exports.RobloxProviderSessionCallback)(session, token);
        });
    },
};
exports.RobloxProviderCallbacks_Database = {
    session({ session, user }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, exports.RobloxProviderSessionCallback)(session, user);
        });
    },
};
