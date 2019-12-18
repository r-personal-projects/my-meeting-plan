import uuid from "uuid";
import {CookieOptions} from "express";

// TODO make it better!
const authTokens: Map<String, String> = new Map();

export function authenticate(user: string, password: string, onSuccess: Function, onFail: Function) {
    console.log('authenticating user', user);
    let authentication = authUser(user, password);
    if (authentication.success)
        onSuccess(authentication);
    else
        onFail();
}

export function deAuthenticate(token: string, onSuccess: Function, onFail: Function) {
    isAuthenticated(token, () => {
        authTokens.delete('token');
        onSuccess();
    }, onFail);
}

export function isAuthenticated(token: string, onSuccess: Function, onFail: Function) {
    if (authTokens.get(token) === undefined) {
        onFail();
    } else {
        onSuccess();
    }
}

export class Authentication {
    constructor(authToken: string | null, success: boolean) {
        this.authToken = authToken;
        this.success = success;
    }

    authToken: string | null;
    success: boolean;
}

function authUser(user: string, pass: string) {
    let success = false;
    let authToken = null;
    if (user === 'rubeen' && pass === 'pass') {
        success = true;
    }


    if (success) {
        authToken = generateAuthToken();
        authTokens.set(authToken, user);
    }

    return new Authentication(authToken, success);
}

function generateAuthToken() {
    return uuid();
}
