import { Application } from "express";
import "dotenv/config";
import express = require("express");
import { https } from "firebase-functions";
import router from "./routes/message";
const app: Application = express();
app.use(router);

export const whatsapp = https.onRequest(app);
