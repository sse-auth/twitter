"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const TwitterLoginButton_1 = __importDefault(require("./TwitterLoginButton"));
const window_1 = require("./services/window");
const oauth1_1 = require("./services/oauth1");
class TwitterLoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.initializeProcess = () => {
            if (window.opener) {
                const [, oauthToken, oauthVerifier] = window.location.search.match(/^(?=.*oauth_token=([^&]+)|)(?=.*oauth_verifier=([^&]+)|).+$/) || [];
                window.opener.postMessage({
                    type: "authorized",
                    data: {
                        oauthToken,
                        oauthVerifier,
                    },
                }, window.origin);
            }
            else {
                const { authCallback, consumerKey, consumerSecret } = this.props;
                window.onmessage = (_a) => __awaiter(this, [_a], void 0, function* ({ data: { type, data } }) {
                    if (type === "authorized") {
                        const accessTokenData = yield (0, oauth1_1.obtainOauthAccessToken)({
                            apiUrl: "https://api.twitter.com/oauth/access_token",
                            consumerKey,
                            consumerSecret,
                            oauthToken: data.oauthToken,
                            oauthVerifier: data.oauthVerifier,
                            method: "POST",
                        });
                        const { popup } = this.state;
                        this.setState({
                            isCompleted: true,
                        }, () => {
                            authCallback && authCallback(undefined, accessTokenData);
                            popup && popup.close();
                        });
                    }
                });
            }
        };
        this.handleLoginClick = () => __awaiter(this, void 0, void 0, function* () {
            const { consumerKey, consumerSecret, callbackUrl } = this.props;
            const popup = (0, window_1.openWindow)({
                url: ``,
                name: "Log in with Twitter",
            });
            if (callbackUrl) {
                console.warn(`DEPRECATED: "callbackUrl" is not supported and ignored from version 1.2.0 and higher. It's hardcoded inside the package with "window.location.href". More details: https://github.com/alexandrtovmach/react-twitter-login/issues/8`);
            }
            const obtainRequestTokenConfig = {
                apiUrl: "https://api.twitter.com/oauth/request_token",
                callbackUrl: window.location.href,
                consumerKey,
                consumerSecret,
                method: "POST",
            };
            const requestTokenData = yield (0, oauth1_1.obtainOauthRequestToken)(obtainRequestTokenConfig);
            if (requestTokenData.oauth_callback_confirmed === "true" &&
                popup !== null) {
                popup.location.href = `https://api.twitter.com/oauth/authorize?oauth_token=${requestTokenData.oauth_token}`;
                if (popup) {
                    (0, window_1.observeWindow)({ popup, onClose: this.handleClosingPopup });
                    this.setState({
                        popup,
                    });
                }
            }
            else {
                this.handleError(`Callback URL "${window.location.href}" is not confirmed. Please check that is whitelisted within the Twitter app settings.`);
            }
        });
        this.handleClosingPopup = () => {
            const { authCallback } = this.props;
            const { isCompleted } = this.state;
            if (!isCompleted) {
                authCallback && authCallback("User closed OAuth popup");
            }
        };
        this.handleError = (message) => {
            const { authCallback } = this.props;
            authCallback(message);
        };
        this.state = {
            isCompleted: false,
        };
    }
    componentDidMount() {
        this.initializeProcess();
    }
    render() {
        const { buttonTheme, className, children } = this.props;
        return children ? (React.createElement("div", { onClick: this.handleLoginClick, className: className }, children)) : (React.createElement(TwitterLoginButton_1.default, { buttonTheme: buttonTheme || "light", buttonClassName: className, onClick: this.handleLoginClick }));
    }
}
exports.default = TwitterLoginComponent;
//# sourceMappingURL=TwitterLogin.js.map