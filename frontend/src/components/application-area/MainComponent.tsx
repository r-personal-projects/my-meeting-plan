import React from "react";
import NavigationElements from "./service-components/NavigationElements";
import {makeStyles} from "@material-ui/core";
import {MenuItemId} from "../../constants/Navigation";
import Schedule from "./service-components/Schedule";
import {BrowserRouter, Route, Switch, useRouteMatch} from "react-router-dom";

const myStyles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    hide: {
        display: 'none',
    }
}));

export default function () {
    const classes = myStyles();
    const [activePage, setActivePage] = React.useState(MenuItemId.Dashboard);
    const {path, url} = useRouteMatch();

    function navigationHandler(id: MenuItemId) {
        console.log('setting active page to', id);
        document.location.href = '/app/' + id;
        setActivePage(id);
    }

    console.log('my-path', path);
    return (
        <>
            <div className={classes.root}>
                <NavigationElements Callback={navigationHandler}/>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>

                    <BrowserRouter>
                        <Switch>
                            <Route path={(path + '/' + MenuItemId.Schedule)}>
                                <Schedule />
                            </Route>
                            <Route path={'/app'}>
                                <div>Dashboard</div>
                            </Route>
                        </Switch>
                    </BrowserRouter>
                </main>
            </div>
        </>
    )
}
