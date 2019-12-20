import express from 'express';
import {Application} from "express";

const apiNotFoundRouter = require('./router/ApiNotFoundRouter');
const defaultRouter = require('./router/DefaultRouter');
const authRouter = require('./router/AuthRouter');
const secureRouter = require('./router/SecuredRouter');

class Server {
    public readonly app: Application;
    private readonly port: number;

    public static bootstrap(port : number | undefined) {
        return new Server(port ? port : 5000);
    }

    constructor(port: number) {
        console.log('Starting the server on port:', port);
        this.port = port;
        this.app = express();

        this.configure();
        this.routes();
    }

    private configure() {
        this.app.listen(this.port);
    }

    private routes() {
        this.app.use('*', defaultRouter);
        this.app.use('/auth', authRouter);
        this.app.use('*', secureRouter);

        this.app.use('/', apiNotFoundRouter);
    }
}

export default Server.bootstrap;
