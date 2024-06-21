interface RequestTokenResponse {
    oauth_token: string;
    oauth_token_secret: string;
    oauth_callback_confirmed?: string;
}
export declare const obtainOauthRequestToken: ({ consumerKey, consumerSecret, callbackUrl, method, apiUrl, }: {
    method: string;
    apiUrl: string;
    callbackUrl: string;
    consumerKey: string;
    consumerSecret: string;
}) => Promise<RequestTokenResponse>;
export declare const obtainOauthAccessToken: ({ consumerKey, consumerSecret, oauthToken, oauthVerifier, method, apiUrl, }: {
    method: string;
    apiUrl: string;
    consumerKey: string;
    consumerSecret: string;
    oauthToken: string;
    oauthVerifier: string;
}) => Promise<RequestTokenResponse>;
export {};
