import * as express from 'express';
import {STATUS_CODES} from "http";

const router = express.Router();

router.get('*', (req, res) => {
    res.status(404).send('No api found on path: ' + req.path);
});

module.exports = router;


