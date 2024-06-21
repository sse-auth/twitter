import * as React from "react";
import { TwitterLoginButtonTheme } from "../index";
interface TwitterLoginButtonProps {
    buttonTheme: TwitterLoginButtonTheme;
    buttonClassName?: string;
    onClick?: any;
}
declare const TwitterLoginButton: React.FunctionComponent<TwitterLoginButtonProps>;
export default TwitterLoginButton;
