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
exports.obtainOauthAccessToken = exports.obtainOauthRequestToken = void 0;
const signature_1 = require("./signature");
const parseOAuthRequestToken = (responseText) => responseText.split("&").reduce((prev, el) => {
    const [key, value] = el.split("=");
    return Object.assign(Object.assign({}, prev), { [key]: value });
}, {});
const obtainOauthRequestToken = (_a) => __awaiter(void 0, [_a], void 0, function* ({ consumerKey, consumerSecret, callbackUrl, method, apiUrl, }) {
    const oauthSignature = (0, signature_1.requestTokenSignature)({
        method,
        apiUrl,
        callbackUrl,
        consumerKey,
        consumerSecret,
    });
    const res = yield fetch(`https://cors.bridged.cc/${apiUrl}`, {
        method,
        headers: {
            Authorization: `OAuth ${oauthSignature}`,
        },
    });
    const responseText = yield res.text();
    return parseOAuthRequestToken(responseText);
});
exports.obtainOauthRequestToken = obtainOauthRequestToken;
const obtainOauthAccessToken = (_a) => __awaiter(void 0, [_a], void 0, function* ({ consumerKey, consumerSecret, oauthToken, oauthVerifier, method, apiUrl, }) {
    const oauthSignature = (0, signature_1.accessTokenSignature)({
        method,
        apiUrl,
        consumerKey,
        consumerSecret,
        oauthToken,
        oauthVerifier,
    });
    const res = yield fetch(`https://cors.bridged.cc/${apiUrl}`, {
        method,
        headers: {
            Authorization: `OAuth ${oauthSignature}`,
        },
    });
    const responseText = yield res.text();
    return parseOAuthRequestToken(responseText);
});
exports.obtainOauthAccessToken = obtainOauthAccessToken;
//# sourceMappingURL=oauth1.js.map