import React from "react";
import NavigationElements from "./service-components/NavigationElements";
import {makeStyles} from "@material-ui/core";

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
    }
}));

export default function () {
    const classes = myStyles();

    return (
        <>
            <div className={classes.root}>
                <NavigationElements/>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>

                    This is the dashboard of the meeting-planner.

                </main>
            </div>
        </>
    )
}
