import { Request, Response, NextFunction } from "express";
import { MessagesServices } from "../services/messages";
import { Itemplate } from "../types/ITemplate";

const sendMessageToNumber = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipent = req.body.recipent;
    const msg = new MessagesServices(recipent);
    const message = req.body.message;
    req.body.recipent;
    req.body.message;
    const response = await msg.sendMessage(message);
    res.status(200).json({ message: response });
  } catch (err) {
    next(err);
  }
};

const sendstaticTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const recipent = req.body.recipent;
  const templateName = req.body.templateName;
  const langCode = req.body.langCode;
  const template: Itemplate = {
    name: templateName,
    language: { code: langCode }
  };
  const msg = new MessagesServices(recipent);
  try {
    const response = await msg.sendTemplate(template);
    res.status(200).json({ message: response });
  } catch (err) {
    next(err);
    res.status(500).json({ message: err });
  }
};

export { sendMessageToNumber, sendstaticTemplate };
