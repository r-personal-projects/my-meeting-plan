import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LoginGateway from "./components/authentication/LoginGateway";
import {CssBaseline, ThemeProvider, useMediaQuery} from "@material-ui/core";
import 'typeface-roboto';
import {getDefaultTheme} from "./services/theming/DefaultTheme";
import {I18nextProvider} from "react-i18next";
import i18n from './i18n';

const App: React.FC = () => {

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    return (
        <>
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
        </>
    );
};

export default App;
