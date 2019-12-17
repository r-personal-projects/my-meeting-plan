import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LoginGateway from "./components/authentication/LoginGateway";
import {CssBaseline, ThemeProvider, useMediaQuery} from "@material-ui/core";
import 'typeface-roboto';
import {getDefaultTheme} from "./services/theming/DefaultTheme";

const App: React.FC = () => {

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    return (
        <>
            <ThemeProvider theme={getDefaultTheme(prefersDarkMode)}>
                <CssBaseline />
                <Router>
                    <Switch>
                        <Route path='/app'>
                            <LoginGateway />
                        </Route>
                    </Switch>
                </Router>
            </ThemeProvider>
        </>
    );
};

export default App;
