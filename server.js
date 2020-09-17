const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const userRoutes = require("./express/userRoutes.js");
const adminRoutes = require("./express/adminRoutes.js");
const nextRoutes = require("./express/nextRoutes.js");
const routes = require("./express/routes.js");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

const { default: next } = require("next");

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

// Multi-process to utilize all CPU cores.
if (!dev && cluster.isMaster) {

    console.log(`Node cluster master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
    });

} else {

    const nextApp = next({ dev });
    const nextHandler = nextApp.getRequestHandler();

    nextApp.prepare().then(() => {
        const app = express();

        app.use(cors({
            credentials: true,
            exposedHeaders: [
                'authorization',
            ]
        }));
        app.use(bodyParser.json({ limit: "50mb" }));
        app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
        app.use(helmet());

        app.use('/api/v1/user', userRoutes);
        app.use('/api/v1/admin', adminRoutes);
        app.use('/api/v1', routes);

        //Middleware that binds nextApp and nextHandler to req to access it from nextRoutes.
        app.use('/', (req, res, next) => {
            req.nextApp = nextApp;
            req.nextHandler = nextHandler;
            next();
        });

        app.use('/', nextRoutes);

        app.listen(port, (err) => {
            if (err) throw err;
        });
    })
}
