import React, {useState} from "react";
import {Button, ButtonGroup, Card, FormControl, TextField} from "@material-ui/core";
import clsx from "clsx";
import './Login.styles.scss';
import {authenticate} from "../../../services/authentication/AuthenticationService";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {useTranslation} from "react-i18next";
import GoogleLogin from "react-google-login";
// @ts-ignore
import GitHubLogin from 'react-github-login';

interface IParams extends RouteComponentProps {
    setRegisterActive: Function,
}

export const LoginComponent = withRouter((props: IParams) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const usernameInputID = 'username-input', passwordInputID = 'password-input';
    const {t} = useTranslation('login-component');

    const handleRegister = (event: any) => {
        props.setRegisterActive(true);
    };

    return (
        <>




                <ButtonGroup fullWidth size={'small'} variant={'contained'} color={'primary'}>
                    <Button onClick={handleRegister}>{t('register-label')}</Button>

                </ButtonGroup>
                <GoogleLogin onSuccess={response => console.log(response)} onFailure={error => console.log(error)} clientId={'xxx'}/>
                <GitHubLogin clientId={'xxx'} buttonText={'Sign in with Github'}/>
        </>
    );
});
