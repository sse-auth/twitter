export declare const requestTokenSignature: ({ method, apiUrl, callbackUrl, consumerKey, consumerSecret, }: {
    method: string;
    apiUrl: string;
    callbackUrl: string;
    consumerKey: string;
    consumerSecret: string;
}) => string;
export declare const accessTokenSignature: ({ consumerKey, consumerSecret, oauthToken, oauthVerifier, method, apiUrl, }: {
    method: string;
    apiUrl: string;
    consumerKey: string;
    consumerSecret: string;
    oauthToken: string;
    oauthVerifier: string;
}) => string;
