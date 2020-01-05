import React from 'react';
import './App.css';
import {CssBaseline, ThemeProvider, useMediaQuery} from "@material-ui/core";
import 'typeface-roboto';
import i18n from './i18n';
import {getDefaultTheme} from "./services/theming/DefaultTheme";
import {I18nextProvider} from "react-i18next";
import {Route, Switch} from 'react-router-dom';
import {LoginGateway} from "./routes/login-gateway/LoginGateway";


const App: React.FC = () => {

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    return (
        <>
            <ThemeProvider theme={getDefaultTheme(prefersDarkMode)}>
                <I18nextProvider i18n={i18n}>
                    <CssBaseline/>
                    <Switch>
                        <Route path={'/(app|login)'}>
                            <LoginGateway />
                        </Route>
                        <Route path={'/'}>
                            Not implemented
                        </Route>
                    </Switch>
                </I18nextProvider>
            </ThemeProvider>

            {/*
            <ThemeProvider theme={getDefaultTheme(prefersDarkMode)}>
                <I18nextProvider i18n={i18n}>
                    <CssBaseline/>
                    <Router>
                        <Switch>
                            <Route path='/(app|login)'>
                                <LoginGateway/>
                            </Route>
                        </Switch>
                    </Router>
                </I18nextProvider>
            </ThemeProvider>
            */}
        </>
    );
};

export default App;
