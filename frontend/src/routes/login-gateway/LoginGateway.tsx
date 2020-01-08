import React, {useEffect, useState} from "react";
import {BrowserRouter, BrowserRouterProps, Redirect, Route, Switch, RouteComponentProps, withRouter} from "react-router-dom";
import {LoginPage} from "../../pages/login-page/Login.page";
import {AppPage} from "../../pages/app-page/App.page";
import {User} from "../../services/authentication/User";
import {getUser, isAuthenticated} from "../../services/authentication/AuthenticationService";


interface IProps extends RouteComponentProps {
}

export const LoginGateway = withRouter((props: IProps) => {
    const [isLoggedIn, setLoggedIn] = useState<boolean | undefined>(undefined);
    const [user, setUser] = useState<User>({name: '', username: ''});

    useEffect(() => {
        setLoggedIn(isAuthenticated());
        setUser(getUser());
    }, []);
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route path={'/login'}>
                        {isLoggedIn ? <Redirect to={'/app'}/> : <LoginPage/>}
                    </Route>
                    <Route path={'/app'}>
                        {isLoggedIn === undefined ? 'Loading...'
                            : isLoggedIn && user !== undefined ?
                                <AppPage user={user}/> : <Redirect to={'/login'}/>}
                    </Route>
                </Switch>
            </BrowserRouter>
        </>
    );
});
