import * as jquery from 'jquery';
import {apiUrl} from "../../constants/URLs";
import {User} from "./User";

const authRequestProperties = {
    crossDomain: true,
    type: 'plain/text',
    xhrFields: {withCredentials: true},
};

export function getUser() : User {
    // TODO api request to get user
    return {username: 'tester', name: 'Peter Test'}
}

export function isAuthenticated() {
    let authenticated = false;
    /*jquery.ajax(apiUrl + '/api', {...authRequestProperties,
        method: 'get',
        async: false,
        cache: false,
    }).done(t => {
        authenticated = true
    });*/

    //return authenticated;

    return true;
}

export function authenticate(user: string, password: string, onSuccess: Function, onFail: Function) {
    jquery.ajax(apiUrl + '/auth/login', {...authRequestProperties,
        method: 'post',
        data: {
            user: user,
            pass: password,
        },
    }).done(t => {
        onSuccess();
    }).fail(t => {
        onFail();
    })
}
