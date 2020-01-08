import React, {useState} from "react";
import {Card, Grid} from "@material-ui/core";
import {LoginComponent} from "../../components/authentication/login/Login.component";
import './Login.styles.scss';
import {RegisterComponent} from "../../components/authentication/register/Register.component";
import {AuthenticationComponent} from "../../components/authentication/AuthenticationContent.component";

export const LoginPage = () => {
    return (
        <>
            <Grid container component='main' className={'root'}>
                <Grid item className={'background'} xs={false} sm={8} md={8}/>
                <Grid item className={'panel'} xs={12} sm={4}>
                    <AuthenticationComponent />
                </Grid>
            </Grid>
        </>
    );
}
