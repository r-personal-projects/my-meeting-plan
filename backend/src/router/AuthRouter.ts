import * as express from 'express';
import {
    authenticate,
    Authentication,
    deAuthenticate,
    getAuthToken,
    isAuthenticated,
    register
} from "../services/auth/AuthHandler";

const router = express.Router();

router.post('/login', ((req, res) => {
    const user = req.body.user;
    const pass = req.body.pass;
    const authToken = getAuthToken(req);

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
    const user = req.body.user;
    const pass = req.body.pass;
    const mail = req.body.mail;
    const authToken = getAuthToken(req);

    isAuthenticated(authToken, () => {
        res.status(418).send('already authenticated');
    }, () => {
        if (user === undefined || user.trim() === ''
            || pass === undefined || pass.trim() === ''
            || mail === undefined || mail.trim() === '') {
            res.status(400).send('Invalid request');
        } else {
            register(user, pass, mail, () => {
                res.status(200).send('account created');
            }, () => {
                res.status(500).send('account couldn\'t be created');
            });
        }
    });
}));

router.post('/logout', (req, res) => {
    const authToken = getAuthToken(req);
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
