import React, {useState} from "react";
import {User} from "../../services/authentication/User";
import {Navigation} from "../../components/navigation/Navigation.component";
import './App.style.scss';
import {MenuItemId} from "../../constants/Navigation";
import {Route, RouteComponentProps, withRouter} from "react-router-dom";
import {MenuItem, Switch} from "@material-ui/core";

interface IProps extends RouteComponentProps {
    user: User,
}

export const AppPage = withRouter((props: IProps) => {
    const {user, history} = props;
    console.log(props);

    function navigationHandler(id: MenuItemId) {
        console.log('setting active page to', id);
        history.push('/app/' + id);
    }

    return (
        <div className={'root'}>
            <Navigation navigationHandler={navigationHandler}/>
            <main className={'content'}>
                <Route exact path={'/app/schedule'}>
                    Hello, {user.name} || Schedule
                </Route>
                <Route exact path={`(${props.match.path}|${props.match.path}/dashboard)`}>
                    Hello, {user.name} || Dashboard
                </Route>
            </main>
        </div>
    )
});
