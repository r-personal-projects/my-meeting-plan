import React, {Component, EventHandler, ReactNode, SyntheticEvent, useState} from "react";
import {Button, ButtonGroup, Card, FormControl, TextField} from "@material-ui/core";
import './AuthenticationContent.styles.scss';
import {RegisterComponent} from "./register/Register.component";
import {LoginComponent} from "./login/Login.component";
import {useTranslation} from "react-i18next";
import clsx from "clsx";
import {authenticate} from "../../services/authentication/AuthenticationService";
import {RouteComponentProps, withRouter} from "react-router-dom";

interface IProps extends RouteComponentProps {

}

interface AuthComponentProps extends React.PropsWithChildren<any> {
    heading: string,
    errorMessage: string,
    handleSubmit: React.MouseEventHandler,
}

const AuthComponent = (props: AuthComponentProps) => {
    return (
        <>
            <h1 className={'heading'}>{props.heading}</h1>
            {props.children}

            <p className={clsx('component-error', {
                'component-login-hide': props.errorMessage.length === 0,
            })}>{props.errorMessage}</p>


            <ButtonGroup fullWidth className={'submit-button-group'} color={'primary'} variant={'contained'}>
                <Button className={'submit-button'} type={'submit'} onClick={props.handleSubmit}>Submit</Button>
            </ButtonGroup>
        </>
    );
};

export const AuthenticationComponent = withRouter((props: IProps) => {
    const [isRegistering, setRegister] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const usernameInputID = 'username-input', passwordInputID = 'password-input';
    const {t: loginT} = useTranslation('login-component');

    const handleInputChange = (event: any) => {
        const value = event.target.value;

        if (event.target.id === usernameInputID) {
            setUsername(value);
        } else if (event.target.id === passwordInputID) {
            setPassword(value);
        }
    };

    const handleLogin = (event: any) => {
        authenticate(username, password,
            () => props.history.push('/app'),
            () => setErrorMessage(loginT('login-error-label')));
        event.preventDefault();
    };

    return (
        <form className={'component-root'}>
            <Card className={'component-card'}>
                {isRegistering ?
                    <AuthComponent heading={loginT('heading')} errorMessage={errorMessage} handleSubmit={() => {
                    }}>

                    </AuthComponent>
                    : <AuthComponent heading={loginT('heading')} errorMessage={errorMessage} handleSubmit={handleLogin}>
                        <FormControl fullWidth className={'component-login-container'}>
                            <TextField id={usernameInputID} onChange={handleInputChange} value={username}
                                       label={loginT('username-label')} type={'text'}/>
                            <TextField id={passwordInputID} onChange={handleInputChange} value={password}
                                       label={loginT('password-label')} type={'password'}/>
                        </FormControl>
                    </AuthComponent>}
                {isRegistering ? <RegisterComponent/>
                    : <LoginComponent setRegisterActive={setRegister}/>}
            </Card>
        </form>
    );
});
