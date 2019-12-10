import React from "react";
import NavigationElements from "./service-components/NavigationElements";
import {makeStyles} from "@material-ui/core";
import clsx from "clsx";
import {MenuItemId} from "../../constants/Navigation";
import Schedule from "./service-components/Schedule";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {updateURL} from "../../services/PathHelper";

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

    function navigationHandler(id: MenuItemId) {
        console.log('setting active page to', id);
        document.location.href = '/app/' + id;
        setActivePage(id);
    }

    return (
        <>
            <div className={classes.root}>
                <NavigationElements Callback={navigationHandler}/>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>

                    <BrowserRouter>
                        <Switch>
                            <Route path={'/app/' + MenuItemId.Schedule}>
                                <Schedule />
                            </Route>
                            <Route path={'/app/'}>
                                <div>Dashboard</div>
                            </Route>
                        </Switch>
                    </BrowserRouter>
                </main>
            </div>
        </>
    )
}
