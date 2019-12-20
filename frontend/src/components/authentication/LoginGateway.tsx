import {isAuthenticated} from "../../services/authentication/AuthenticationService";
import React from "react";
import MeetingApp from "../MeetingApp";
import LoginPage from "../LoginPage";
import {BrowserRouter, Route, useRouteMatch, Switch, Redirect} from "react-router-dom";


export default function () {
    return (
      <>
          <BrowserRouter>
              <Switch>
                  <Route path={'/login'}>
                      {isAuthenticated() ? <Redirect to={'/app'} /> : <LoginPage />}
                  </Route>
                  <Route path={'/app'}>
                      {isAuthenticated() ? <MeetingApp /> : <Redirect to={'/login'} />}
                  </Route>
              </Switch>
          </BrowserRouter>
      </>
    );
}
