"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessTokenSignature = exports.requestTokenSignature = void 0;
const crypto_js_1 = require("crypto-js");
const requestTokenSignature = ({ method, apiUrl, callbackUrl, consumerKey, consumerSecret, }) => {
    const params = {
        oauth_consumer_key: consumerKey,
        oauth_version: "1.0",
        oauth_signature_method: "HMAC-SHA1",
        oauth_callback: callbackUrl,
        oauth_timestamp: (Date.now() / 1000).toFixed(),
        oauth_nonce: Math.random()
            .toString(36)
            .replace(/[^a-z]/, "")
            .substr(2),
    };
    return makeSignature(params, method, apiUrl, consumerSecret);
};
exports.requestTokenSignature = requestTokenSignature;
const accessTokenSignature = ({ consumerKey, consumerSecret, oauthToken, oauthVerifier, method, apiUrl, }) => {
    const params = {
        oauth_consumer_key: consumerKey,
        oauth_version: "1.0",
        oauth_signature_method: "HMAC-SHA1",
        oauth_token: oauthToken,
        oauth_verifier: oauthVerifier,
        oauth_timestamp: (Date.now() / 1000).toFixed(),
        oauth_nonce: Math.random()
            .toString(36)
            .replace(/[^a-z]/, "")
            .substr(2),
    };
    return makeSignature(params, method, apiUrl, consumerSecret);
};
exports.accessTokenSignature = accessTokenSignature;
const makeSignature = (params, method, apiUrl, consumerSecret) => {
    const paramsBaseString = Object.keys(params)
        .sort()
        .reduce((prev, el) => {
        return (prev += `&${el}=${params[el]}`);
    }, "")
        .substr(1);
    const signatureBaseString = `${method.toUpperCase()}&${encodeURIComponent(apiUrl)}&${encodeURIComponent(paramsBaseString)}`;
    const signingKey = `${encodeURIComponent(consumerSecret)}&`;
    const oauth_signature = crypto_js_1.enc.Base64.stringify((0, crypto_js_1.HmacSHA1)(signatureBaseString, signingKey));
    const paramsWithSignature = Object.assign(Object.assign({}, params), { oauth_signature: encodeURIComponent(oauth_signature) });
    return Object.keys(paramsWithSignature)
        .sort()
        .reduce((prev, el) => {
        return (prev += `,${el}="${paramsWithSignature[el]}"`);
    }, "")
        .substr(1);
};
//# sourceMappingURL=signature.js.map