import {RegisterController} from "./routes/register/RegisterController";
import {RequestController} from "./routes/request/RequestController";
import {Server} from "socket.io";
import express from 'express';
import indexRouter from "./routes/index"
import bodyParser from "body-parser";
import logger from "morgan";
import cors from "cors"
import fs from "fs";
import https from "https";

const servePort = 8000;

const app = express();
app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/", indexRouter);
app.use("/request", new RequestController().router);

let credentials = {
    key: fs.readFileSync("backend-privateKey.key"),
    cert: fs.readFileSync("backend.crt"),
}

const server = https.createServer(credentials, app).listen(servePort, "0.0.0.0" || "localhost", () => {
    console.log(`Server listening on port ${servePort}!`)
})

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
io.on("connect", socket => {
    new RegisterController(socket);
})