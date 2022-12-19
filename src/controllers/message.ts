import * as functions from "firebase-functions";
import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import facebookAxios from "../services/axios";

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
exports.sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //sort of dialing phone code json
  // const recipent = req.body.recipent;
  // const messageEzz = req.body.message;
  // const response = sendTemplate("hello_world", "201279187181", "en_US");
  req.body.recipent;
  req.body.message;
  sendTemplate("hello_world", "201279187181", "en_US");
};

exports.recieveWebhooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body_param = req.body;
  functions.logger.info("callback logs=body_param", JSON.stringify(body_param));
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
      return res.sendStatus(200);
    }
  }
};
