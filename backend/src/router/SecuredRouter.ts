import {isAuthenticated} from "../services/auth/AuthHandler";
import * as express from "express";

const router = express.Router();

router.use((req, res, next) => {
    const authToken = req.cookies['auth-token'];
    isAuthenticated(authToken, next, () => {
        res.status(403).send();
    });
});

module.exports = router;
