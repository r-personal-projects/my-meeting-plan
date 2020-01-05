import React from "react";
import {Grid} from "@material-ui/core";
import { LoginComponent } from "../../components/login/Login.component";
import './Login.styles.scss';

export const LoginPage = () => {
    return (
        <>
            <Grid container component='main' className={'root'}>
                <Grid item className={'background'} xs={false} sm={8} md={8}/>
                <Grid item className={'panel'} xs={12} sm={4}>
                    <LoginComponent />
                </Grid>
            </Grid>
        </>
    );
}
