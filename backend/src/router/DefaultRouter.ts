import express from 'express';

const router = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

router.use(bodyParser.urlencoded({
    extended: true,
}));
router.use(bodyParser.json());
router.use(cookieParser());


router.use(function timeLog(req: any, res: any, next: () => void) {
    console.log('Time: ', Date.now());
    next();
});

module.exports = router;

