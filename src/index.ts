import * as functions from "firebase-functions";
import { Request, Response, Application } from "express";
import express = require("express");
import { https } from "firebase-functions";
import router from "./routes/message";
const app: Application = express();
const config = {
  verifyToken: "WEBHOOK_VERIFIED",
  mode: "subscribe"
};
// app.use(); // protect all routes

app.use(router);
app.get("/webhooks", (request: Request, response: Response) => {
  // Parse the query params
  const mode = request.query["hub.mode"];
  const token = request.query["hub.verify_token"];
  const challenge = request.query["hub.challenge"];

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === config.mode && token === config.verifyToken) {
      // Respond with the challenge token from the request
      console.dir(request.body, { depth: null });
      functions.logger.info("callback logs=", JSON.stringify(request.body));
      return response.status(200).send(challenge);
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      return response.sendStatus(403);
    }
  }
  return response.sendStatus(400);
});

// app.post("/webhooks", (req: Request, res: Response) => {
//   // Parse the query params
//   const body_param = req.body;
//   functions.logger.info("callback logs=body_param", JSON.stringify(body_param));
//   if (body_param.object) {
//     if (
//       body_param.entry &&
//       body_param.entry[0].changes &&
//       body_param.entry[0].changes[0].value.messages &&
//       body_param.entry[0].changes[0].value.messages[0]
//     ) {
//       const phon_no_id =
//         body_param.entry[0].changes[0].value.metadata.phone_number_id;
//       const from = body_param.entry[0].changes[0].value.messages[0].from;
//       const msg_body =
//         body_param.entry[0].changes[0].value.messages[0].text.body;

//       functions.logger.info(
//         "callback logs=phone number",
//         JSON.stringify(phon_no_id)
//       );
//       functions.logger.info("callback logs=from", JSON.stringify(from));
//       functions.logger.info(
//         "callback logs=body param",
//         JSON.stringify(msg_body)
//       );
//       return res.sendStatus(200);
//     }
//   }
//   return res.sendStatus(400);
// });

export const whatsapp = https.onRequest(app);
