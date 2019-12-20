import {getAuthToken, isAuthenticated} from "../services/auth/AuthHandler";
import * as express from "express";

const router = express.Router();

router.use((req, res, next) => {
    const authToken = getAuthToken(req);
    isAuthenticated(authToken, next, () => {
        res.status(403).send();
    });
});

module.exports = router;
