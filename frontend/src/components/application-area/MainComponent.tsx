import React from "react";
import NavigationElements from "./service-components/NavigationElements";
import {IconButton, makeStyles} from "@material-ui/core";
import clsx from "clsx";

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
    const [activePage, setActivePage] = React.useState('dashboard');

    function navigationHandler(id: string) {

    }

    return (
        <>
            <div className={classes.root}>
                <NavigationElements Callback={navigationHandler} />
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <div className={clsx(undefined, {[classes.hide]: activePage !== 'dashboard'})}>
                        Dashboard
                    </div>
                    <div className={clsx(undefined, {[classes.hide]: activePage !== 'dashboard'})}>

                    </div>
                </main>
            </div>
        </>
    )
}
