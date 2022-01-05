const express = require('express');
const config = require('dotenv').config();
const routes = require('./routes');

class AppController {
    constructor() {
        this.express = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.express.use(express.json());
    }

    routes() {
        this.express.use(routes);
    }
}

module.exports = new AppController().express;