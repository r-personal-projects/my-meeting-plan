import * as express from 'express';
import {authenticate, Authentication, deAuthenticate, isAuthenticated} from "../services/auth/AuthHandler";

const router = express.Router();

router.post('/login', ((req, res) => {
    const user = req.body.user;
    const pass = req.body.pass;
    const authToken = req.cookies['auth-token'];

    console.log('user has auth-token...', user, authToken);

    isAuthenticated(authToken, () => {
        res.status(200).send('already authenticated');
    }, () => {
        if (user === undefined || pass === undefined) {
            res.status(400).send('Invalid request');
        } else {
            authenticate(user, pass, (authentication: Authentication) => {
                res.cookie('auth-token', authentication.authToken);
                res.status(200).send('Login success');
            }, () => {
                res.status(403).send('Invalid credentials');
            })
        }
    });
}));

router.post('/register', ((req, res) => {
    res.status(501).send('you can\'t be registered');
}));

router.post('/logout', (req, res) => {
    const authToken = req.cookies['auth-token'];
    deAuthenticate(authToken, () => {
        res.cookie('auth-token', '');
        res.status(200).send('Logged out');
    }, () => {
        res.status(418).send('Already logged out');
    });
});

router.get('*', (req, res) => {
    res.status(405).send('Method not allowed on this endpoint');
});


module.exports = router;
