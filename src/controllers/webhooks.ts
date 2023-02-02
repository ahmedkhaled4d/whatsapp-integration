import * as functions from "firebase-functions";
import { Request, Response, NextFunction } from "express";
//import { Imessage } from "../types/Imessage";
import HttpException from "../exceptions/HttpException";
//import { phoneNumbers } from "../tests/_mock/phones";
import { MessagesServices } from "../services/messages";
import AWS from "aws-sdk";
import { AWSConfig } from "../config";
const verifyToken = process.env.VERIFY_TOKEN as string;
import { v4 as uuidv4 } from "uuid";
const recieveWebhooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bodyParam = req.body;
    if (bodyParam.object) {
      if (bodyParam?.entry[0]?.changes[0]?.value?.messages[0]) {
        functions.logger.info(
          "Webhooks logs=bodyParam",
          JSON.stringify(bodyParam)
        );
        const phonNoId =
          bodyParam.entry[0].changes[0].value.metadata.phone_number_id;
        const from = bodyParam.entry[0].changes[0].value.messages[0].from;
        const timestamp =
          bodyParam.entry[0].changes[0].value.messages[0].timestamp;
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
        AWS.config.update(AWSConfig.aws_remote_config);
        const docClient = new AWS.DynamoDB.DocumentClient();
        const msg_id = uuidv4();
        const params = {
          TableName: AWSConfig.aws_table_name,
          Item: {
            message_id: msg_id,
            timestamp: parseInt(timestamp),
            reply_template: "Hello World",
            sender: from,
            content: msgBody
          }
        };

        // Call DynamoDB to add the item to the table
        docClient.put(params, function (err, data) {
          if (err) {
            functions.logger.info("Error happened");
          } else {
            functions.logger.info("Conversation added to db");
          }
        });
        const messagesServices = new MessagesServices(from);
        // await messagesServices.sendMessage(msgBody);

        switch (msgBody) {
          case "1":
            await messagesServices.sendMessage("Choose Language");
            break;
          case "2":
            await messagesServices.sendMessage("Choose Project");
            break;
          case "3":
            await messagesServices.sendMessage("Choose Service");
            break;
          default:
            await messagesServices.sendMessage("Send 1 or 2 or 3 please");
            break;
        }

        return res.sendStatus(200);
      } else {
        return res.sendStatus(400);
      }
    }
  } catch (e) {
    next(e);
  }
};

const verifyWebhook = (request: Request, response: Response) => {
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

export { recieveWebhooks, verifyWebhook };
