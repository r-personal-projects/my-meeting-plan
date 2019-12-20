import express from 'express';

const router = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", 'true');
    next();
});
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

