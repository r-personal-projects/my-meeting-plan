import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LoginGateway from "./components/authentication/LoginGateway";
import {CssBaseline, ThemeProvider} from "@material-ui/core";
import 'typeface-roboto';
import {defaultClasses} from "./services/theming/DefaultClasses";
import {getDefaultTheme} from "./services/theming/DefaultTheme";

const App: React.FC = () => {

    const classes = defaultClasses();

    return (
        <>
            <ThemeProvider theme={getDefaultTheme()}>
                <CssBaseline/>
                <Router>
                    <Switch>
                        <Route path='/app'>
                            <LoginGateway/>
                        </Route>
                    </Switch>
                </Router>
            </ThemeProvider>
        </>
    );
};

export default App;
