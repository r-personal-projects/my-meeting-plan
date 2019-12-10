import React from "react";
import {updateURL} from "../../../services/PathHelper";
import {Grid, makeStyles} from "@material-ui/core";


const myStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
}));

export default function () {
    const classes = myStyles();

    return (
        <>
            <div className={classes.root}>
                <Grid item className={classes.paper} xs={12}>
                    I'm xs 12
                </Grid>
                <Grid item className={classes.paper} xs={12} sm={6}>
                    Im xs 12 sm 6
                </Grid>
            </div>
        </>
    );
}
