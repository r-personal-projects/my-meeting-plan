import React, {useState} from "react";
import {Button, ButtonGroup, Card, FormControl, TextField} from "@material-ui/core";
import './AuthenticationContent.styles.scss';
import {useTranslation} from "react-i18next";
import clsx from "clsx";
import {authenticate, registerUser} from "../../services/authentication/AuthenticationService";
import {RouteComponentProps, withRouter} from "react-router-dom";
import GoogleLogin from "react-google-login";

interface IProps extends RouteComponentProps {

}

interface AuthComponentProps extends React.PropsWithChildren<any> {
    heading: string,
    errorMessage: string,
    back: string,
    submit: string,
    handleSubmit: React.MouseEventHandler,
    handleBack: React.MouseEventHandler,
}

const AuthComponent = (props: AuthComponentProps) => {
    return (
        <>
            <h1 className={'heading'}>{props.heading}</h1>
            {props.children}

            <p className={clsx('component-error', {
                'component-login-hide': props.errorMessage.length === 0,
            })}>{props.errorMessage}</p>


            <ButtonGroup className={'submit-button-group'} color={'primary'} variant={'contained'}>
                <Button className={'submit-button'} type={'submit'} onClick={props.handleSubmit}>{props.submit}</Button>
            </ButtonGroup>

            <GoogleLogin className={'google-button'} onSuccess={response => console.log(response)} onFailure={error => console.log(error)}
                         clientId={'xxx'}/>

            <Button className={'back-button'} onClick={props.handleBack}>{props.back}</Button>
        </>
    );
};

export const AuthenticationComponent = withRouter((props: IProps) => {
    const [isRegistering, setRegister] = useState(false);

    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const usernameInputID = 'username-input', passwordInputID = 'password-input', nameInputID = 'name-input';
    const {t: loginT} = useTranslation('login-component');
    const {t: registerT} = useTranslation('register-component');

    const handleInputChange = (event: any) => {
        const value = event.target.value;

        switch (event.target.id) {
            case usernameInputID:
                setUsername(value);
                break;
            case passwordInputID:
                setPassword(value);
                break;
            case nameInputID:
                setName(value);
                break;
        }
    };

    const handleLogin = (event: any) => {
        authenticate(username, password,
            () => props.history.push('/app'),
            () => setErrorMessage(loginT('login-error-label')));
        event.preventDefault();
    };

    const handleRegister = (event: any) => {
        registerUser({name: name, password: password, username: username},
            () => props.history.push('/app'),
            () => setErrorMessage(registerT('login-error-label')));
        event.preventDefault();
    };

    return (
        <form className={'component-root'}>
            <Card className={'component-card'}>
                {isRegistering ?
                    <AuthComponent heading={registerT('heading')} errorMessage={errorMessage} handleSubmit={handleRegister}
                                   handleBack={() => setRegister(false)} back={registerT('back-label')} submit={registerT('register-label')}>
                        <FormControl fullWidth className={'component-container'}>
                            <TextField id={nameInputID} onChange={handleInputChange} value={name} label={registerT('name-label')}
                                       type={'name'}/>
                            <TextField id={usernameInputID} onChange={handleInputChange} value={username} label={registerT('username-label')}
                                       type={'text'}/>
                            <TextField id={passwordInputID} onChange={handleInputChange} value={password} label={registerT('password-label')}
                                       type={'password'}/>
                        </FormControl>
                    </AuthComponent>
                    : <AuthComponent heading={loginT('heading')} errorMessage={errorMessage} handleSubmit={handleLogin}
                                     handleBack={() => setRegister(true)} back={loginT('back-label')} submit={loginT('login-label')}>
                        <FormControl fullWidth className={'component-container'}>
                            <TextField id={usernameInputID} onChange={handleInputChange} value={username}
                                       label={loginT('username-label')} type={'text'}/>
                            <TextField id={passwordInputID} onChange={handleInputChange} value={password}
                                       label={loginT('password-label')} type={'password'}/>
                        </FormControl>
                    </AuthComponent>}
            </Card>
        </form>
    );
});
