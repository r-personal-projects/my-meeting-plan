import * as express from 'express';
import {STATUS_CODES} from "http";

const router = express.Router();

router.get('/api', ((req, res) => {
    console.log('ping');
    res.status(200).send('OK');
}));

router.get('*', (req, res) => {
    console.log('NOT FOUND: ', req.url);
    res.status(404).send('No api found on path: ' + req.path);
});

module.exports = router;


