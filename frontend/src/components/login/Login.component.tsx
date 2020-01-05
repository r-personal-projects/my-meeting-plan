import React from "react";
import {authenticate} from "../../services/authentication/AuthenticationService";
import {Button, ButtonGroup, Card, FormControl, makeStyles, TextField, Theme, withStyles} from "@material-ui/core";
import clsx from "clsx";
import './Login.styles.scss';

interface LoginComponentState {
    username: string,
    password: string,
    errorMessage: string,
    usernameInputID: string,
    passwordInputID: string,
}

interface LoginComponentParams {
}

export class LoginComponent extends React.Component<LoginComponentParams, LoginComponentState> {
    constructor(params: LoginComponentParams) {
        super(params);

        this.state = {
            username: '',
            password: '',
            errorMessage: '',
            usernameInputID: `username${Math.random()}`,
            passwordInputID: `password${Math.random()}`,
        };
    }

    render() {
        const {username, password, errorMessage, usernameInputID, passwordInputID} = this.state;

        return (
            <>
                <form className={'component-login-root'}>
                    <Card className={'component-login-card'}>
                        <FormControl fullWidth className={'component-login-container'}>
                            <TextField id={usernameInputID} onChange={this.handleInputChange} value={username}
                                       label={'Username'} type={'text'}/>
                            <TextField id={passwordInputID} onChange={this.handleInputChange} value={password}
                                       label={'Password'} type={'password'}/>
                            <p className={clsx('component-login-error', {
                                ['component-login-hide']: errorMessage.length === 0,
                            })}>{errorMessage}</p>
                            <ButtonGroup fullWidth size={'small'} variant={'contained'} color={'primary'}>
                                <Button>Register</Button>
                                <Button type={'submit'} onClick={this.handleLogin}>Login</Button>
                            </ButtonGroup>
                        </FormControl>
                    </Card>
                </form>
            </>
        );
    };

    handleInputChange = (event: any) => {
        const value = event.target.value;
        const {usernameInputID, passwordInputID} = this.state;

        if (event.target.id === usernameInputID) {
            this.setState({username: value});
        } else if (event.target.id === passwordInputID) {
            this.setState({password: value});
        }
    };

    handleLogin = (event: any) => {
        console.log(this);
        const {username, password} = this.state;

        console.log('username: ' + username + " || password: " + password);
        authenticate(username, password,
            () => document.location.reload(),
            () => this.setState({errorMessage: 'Login failed'}));
        event.preventDefault();
    };
}
