import React, {SyntheticEvent} from "react";
import {Container, Grid, makeStyles, TextField, Button, ButtonGroup, FormControl, Card} from "@material-ui/core";
import DemoBackground from './res/images/demo-bg-2.png';
import {authenticate} from "../services/authentication/AuthenticationService";

const myStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        width: '100vw',
    },
    background: {
        backgroundImage: `url(${DemoBackground})`,
        backgroundSize: 'cover'
    },
    panel: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: theme.palette.background.default,
    }
}));

const formStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '100%',
        paddingLeft: '1em',
        paddingRight: '1em',

        '& > *': {
            marginTop: '1em',
        },
    },
    card: {
        width: '100%',
        paddingBottom: '1em',
        paddingTop: '1em'
    },
}));

export default function () {
    const classes = myStyles();

    return (
        <>
            <Grid container component='main' className={classes.root}>
                <Grid item className={classes.background} xs={false} sm={8} md={8} lg={10}/>
                <Grid item className={classes.panel} xs={12} sm={4} lg={2}>
                    <LoginComponent/>
                </Grid>
            </Grid>
        </>
    );
}


function LoginComponent() {
    const classes = formStyles();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const usernameID = `username${Math.random()}`;
    const passwordID = `password${Math.random()}`;


    function handleLogin(event: any) {
        console.log('username: ' + username + " || password: " + password);
        authenticate(username, password,
            () => document.location.reload(),
            () => alert('todo, login failed'));
        event.preventDefault();
    }

    function handleInputChange(event: any) {
        console.log('event', event.target);
        if (event.target.id === usernameID) {
            setUsername(event.target.value);
        } else if (event.target.id === passwordID) {
            setPassword(event.target.value);
        }
    }

    return (
        <>
            <form className={classes.root}>
                <Card className={classes.card}>
                    <FormControl fullWidth className={classes.container}>
                        <TextField id={usernameID} onChange={handleInputChange} value={username} label={'Username'} type={'text'}/>
                        <TextField id={passwordID} onChange={handleInputChange} value={password} label={'Password'} type={'password'}/>
                        <ButtonGroup fullWidth size={'small'} variant={'contained'} color={'primary'}>
                            <Button>Register</Button>
                            <Button type={'submit'} onClick={handleLogin}>Login</Button>
                        </ButtonGroup>
                    </FormControl>
                </Card>
            </form>
        </>
    );
}
