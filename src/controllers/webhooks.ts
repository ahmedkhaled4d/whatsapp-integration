import * as functions from "firebase-functions";
import { Request, Response, NextFunction } from "express";
import { IWebhook } from "../types/IWebhook";
import HttpException from "../exceptions/HttpException";

// import { MessagesServices } from "../services/messages";
// import { phoneNumbers } from "../tests/_mock/phones";

const verifyToken = process.env.VERIFY_TOKEN as string;

exports.recieveWebhooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bodyParam: IWebhook = req.body;
    functions.logger.info("Webhooks logs=bodyParam", JSON.stringify(bodyParam));
    if (bodyParam.object) {
      if (
        bodyParam.entry &&
        bodyParam.entry[0].changes &&
        bodyParam.entry[0].changes[0].value.messages &&
        bodyParam.entry[0].changes[0].value.messages[0]
      ) {
        const phonNoId =
          bodyParam.entry[0].changes[0].value.metadata.phone_number_id;
        const from = bodyParam.entry[0].changes[0].value.messages[0].from;
        const msgBody =
          bodyParam.entry[0].changes[0].value.messages[0].text.body;

        functions.logger.info(
          "callback logs=phone number",
          JSON.stringify(phonNoId)
        );
        functions.logger.info("callback logs=from", JSON.stringify(from));
        functions.logger.info(
          "callback logs=body param",
          JSON.stringify(msgBody)
        );
        // const messagesServices = new MessagesServices(phoneNumbers.ezz);
        // await messagesServices.sendMessage(msgBody);
        return res.sendStatus(200);
      }
    }
  } catch (e) {
    next(e);
  }
};

exports.verifyWebhook = (request: Request, response: Response) => {
  // Parse the query params
  const currentMode = "subscribe";
  const mode = request.query["hub.mode"];
  const token = request.query["hub.verify_token"];
  const challenge = request.query["hub.challenge"];

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === currentMode && token === verifyToken) {
      // Respond with the challenge token from the request
      console.dir(request.body, { depth: null });
      functions.logger.info("callback logs=", JSON.stringify(request.body));
      return response.status(200).send(challenge);
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      return response.sendStatus(403);
    }
  } else {
    throw new HttpException(400, "Bad Request");
  }
};
