import * as functions from "firebase-functions";
import { Request, Response, NextFunction } from "express";

import facebookAxios from "../interceptors/facebookAxios.interceptor";
import { Icallback } from "../types/ICallback";

function sendMessage(recipent: string, messageBody: string) {
  try {
    const data = JSON.stringify({
      messaging_product: "whatsapp",
      to: recipent,
      type: "text",
      text: {
        body: messageBody
      }
    });

    const config = {
      method: "post",
      data: data
    };

    facebookAxios(config)
      .then(function (response) {
        return JSON.stringify(response.data);
      })
      .catch(function (error) {
        return error;
      });
  } catch (err) {
    return err;
  }
}
function sendTemplate(
  templateName: string,
  recipent: string,
  lang_code: string
) {
  try {
    const data = JSON.stringify({
      messaging_product: "whatsapp",
      to: recipent,
      type: "template",
      template: {
        name: templateName,
        language: {
          code: lang_code
        }
      }
    });

    const config = {
      method: "post",
      data: data
    };

    facebookAxios(config)
      .then(function (response) {
        return JSON.stringify(response.data);
      })
      .catch(function (error) {
        return error;
      });
  } catch (err) {
    return err;
  }
}

exports.sendMessageToNumber = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //sort of dialing phone code json
    const recipent = req.body.recipent;
    const message = req.body.message;
    req.body.recipent;
    req.body.message;
    const response = sendMessage(recipent, message);
    res.status(200).json({ message: response });
  } catch (err) {
    next(err);
    res.status(500).json({ message: err });
  }
};

exports.sendstaticTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //sort of dialing phone code json
    // const recipent = req.body.recipent;
    // const messageEzz = req.body.message;
    // const response = sendTemplate("hello_world", "201279187181", "en_US");
    req.body.recipent;
    req.body.message;
    const response = sendTemplate("hello_world", "201279187181", "en_US");
    res.status(200).json({ message: response });
  } catch (err) {
    next(err);
    res.status(500).json({ message: err });
  }
};

exports.recieveWebhooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body_param: Icallback = req.body;
    functions.logger.info(
      "callback logs=body_param",
      JSON.stringify(body_param)
    );
    if (body_param.object) {
      if (
        body_param.entry &&
        body_param.entry[0].changes &&
        body_param.entry[0].changes[0].value.messages &&
        body_param.entry[0].changes[0].value.messages[0]
      ) {
        const phon_no_id =
          body_param.entry[0].changes[0].value.metadata.phone_number_id;
        const from = body_param.entry[0].changes[0].value.messages[0].from;
        const msg_body =
          body_param.entry[0].changes[0].value.messages[0].text.body;

        functions.logger.info(
          "callback logs=phone number",
          JSON.stringify(phon_no_id)
        );
        functions.logger.info("callback logs=from", JSON.stringify(from));
        functions.logger.info(
          "callback logs=body param",
          JSON.stringify(msg_body)
        );
        sendMessage(from, msg_body);
        return res.sendStatus(200);
      }
    }
  } catch (e) {
    next(e);
    return res.sendStatus(500);
  }
};

exports.verifyWebhook = (request: Request, response: Response) => {
  // Parse the query params
  const config = {
    verifyToken: "WEBHOOK_VERIFIED",
    mode: "subscribe"
  };
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
};
