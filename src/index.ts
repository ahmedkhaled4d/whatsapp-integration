import * as functions from "firebase-functions";
import { Request, Response, Application } from "express";
import express = require("express");
import { https } from "firebase-functions";
const app: Application = express();
const config = {
  verifyToken: "WEBHOOK_VERIFIED"
};
// app.use(); // protect all routes
app.post("/callback", (request: Request, response: Response) => {
  // Parse the query params
  const mode = request.query["hub.mode"];
  const token = request.query["hub.verify_token"];
  // const challenge = request.query["hub.challenge"];

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === "subscribe" && token === config.verifyToken) {
      // Respond with the challenge token from the request
      console.dir(request.body, { depth: null });
      functions.logger.info("callback logs=", JSON.stringify(request.body));
      response.status(200).send("log saved");
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      response.sendStatus(403);
    }
  }
});

export const whatsapp = https.onRequest(app);
