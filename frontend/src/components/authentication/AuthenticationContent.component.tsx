import React, {useState} from "react";
import {Button, ButtonGroup, Card, FormControl, TextField} from "@material-ui/core";
import './AuthenticationContent.styles.scss';
import {useTranslation} from "react-i18next";
import clsx from "clsx";
import {authenticate} from "../../services/authentication/AuthenticationService";
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
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const usernameInputID = 'username-input', passwordInputID = 'password-input';
    const {t: loginT} = useTranslation('login-component');
    const {t: registerT} = useTranslation('register-component');

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
                    }}
                                   handleBack={() => setRegister(false)} back={'back'} submit={'Register'}>

                    </AuthComponent>
                    : <AuthComponent heading={loginT('heading')} errorMessage={errorMessage} handleSubmit={handleLogin}
                                     handleBack={() => setRegister(true)} back={loginT('back-label')} submit={'Login'}>
                        <FormControl fullWidth className={'component-login-container'}>
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
