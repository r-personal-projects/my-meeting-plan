import * as jquery from 'jquery';
import {apiUrl} from "../../constants/URLs";

export function isAuthenticated() {
    let authenticated = false;
    jquery.ajax(apiUrl + '/api', {
        cache: false,
        async: false,
    }).done(t => {
        authenticated = true
    });

    return authenticated;
}
