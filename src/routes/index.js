import { testRoute } from './testRoute';
import { signUpRoute } from './signUpRoute';
import { loginRoute } from './loginRoute';
import { upadateUserInfoRoute } from './updateUserInfo';
import { verifyEmailRoute } from './verifyEmailRoute';
import { forgotPasswordRoute } from './forgotPasswordRoute';
import { resetPasswordRoute } from './passwordResetRoute';
import { getGoogleOAuthUrlRoute } from './getGoogleOAuthUrlRoute';
import { googleOauthCallbackRoute } from './googleOAuthCallbackRoute';

export const routes = [
    testRoute,signUpRoute,loginRoute,
    upadateUserInfoRoute,verifyEmailRoute,forgotPasswordRoute,resetPasswordRoute,getGoogleOAuthUrlRoute,googleOauthCallbackRoute
];
