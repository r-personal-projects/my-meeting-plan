import React from "react";
import {Grid, makeStyles} from "@material-ui/core";

const myStyles = makeStyles(theme => ({
   root: {
       height: '100vh',
       width: '100vw',
   },
    background: {
       backgroundImage: 'url("/logo512.png")',
    }
}));

export default function () {
    const classes = myStyles();

    return (
        <>
            <Grid container component='main' className={classes.root}>
                <Grid item className={classes.background} xs={false} md={12} />
            </Grid>
        </>
    );
}
