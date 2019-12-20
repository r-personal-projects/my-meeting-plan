import uuid from "uuid";
import {createUser, getUserByUsername, User, UserEntity} from "../data/schemas/UserSchema";
import * as bcrypt from 'bcrypt';

// TODO make it better!
const authTokens: Map<String, String> = new Map();

export function authenticate(user: string, password: string, onSuccess: Function, onFail: Function) {
    console.log('authenticating user', user);
    authUser(user, password, onSuccess, onFail);
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

export function register(username: string, password: string, email: string, onSuccess: Function, onFail: Function) {
    registerUser(username, password, email, onSuccess, onFail);
}

export class Authentication {
    constructor(authToken: string | null, success: boolean) {
        this.authToken = authToken;
        this.success = success;
    }

    authToken: string | null;
    success: boolean;
}

export function getAuthToken(req: any) {
    return req.cookies['auth-token'];
}

function authUser(username: string, pass: string, onSuccess: Function, onFail: Function) {
    getUserByUsername(username).then(user => {
        const success: boolean = user !== null;

        if (success) {
            const authToken = generateAuthToken();
            authTokens.set(authToken, username);
            onSuccess(new Authentication(authToken, success))
        } else {
            onFail();
        }
    })
}

function registerUser(username: string, password: string, email: string, onSuccess: Function, onFail: Function) {
    const user: User = {
        email: email, password: password, username: username
    };
    createUser(user, onSuccess, onFail);
}

function generateAuthToken() {
    return uuid();
}
