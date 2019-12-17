import {isAuthenticated} from "../../services/authentication/AuthenticationService";
import React from "react";
import MeetingApp from "../MeetingApp";
import LoginPage from "../LoginPage";


export default function () {
    return (
      <>
          {isAuthenticated() ? <MeetingApp /> : <LoginPage />}
      </>
    );
}
