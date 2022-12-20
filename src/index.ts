import { Application } from "express";
import "dotenv/config";
import express = require("express");
import { https } from "firebase-functions";
import router from "./routes/message";
import errorMiddleware from "./middleware/error.middleware";

const app: Application = express();
app.use(router);
app.use(errorMiddleware);

export const whatsapp = https.onRequest(app);
