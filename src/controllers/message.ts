import { Request, Response, NextFunction } from "express";
import { MessagesServices } from "../services/messages";
import { Itemplate } from "../types/ITemplate";
import { savedTemplates } from "../tests/_mock/templates";
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
    await msg.sendMessage(message);
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

const sendstaticTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const recipent = req.body.recipent as string;
  const templateName = req.body.templateName as keyof typeof savedTemplates;
  const template: Itemplate = savedTemplates[templateName];
  console.log("template Name => " + templateName);
  console.log("template Body => " + template);
  const msg = new MessagesServices(recipent);
  try {
    await msg.sendTemplate(template);
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

export { sendMessageToNumber, sendstaticTemplate };
