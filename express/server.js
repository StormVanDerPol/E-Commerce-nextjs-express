import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import userRoutes from "./userRoutes.js";
import adminRoutes from "./adminRoutes.js";
import routes from "./routes.js";

const app = express();

const port = 8080;

app.use(cors({
    credentials: true,
    exposedHeaders: [
        'authorization'
    ]
}));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(helmet());

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1', routes);

app.listen(port);