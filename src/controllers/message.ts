import { Request, Response, NextFunction } from "express";
import { MessagesServices } from "../services/messages";
import { Itemplate } from "../types/ITemplate";
import { savedTemplates } from "../tests/_mock/templates";
import AWS from "aws-sdk";
import { AWSConfig } from "../config";
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
  const template: Itemplate = savedTemplates[templateName] as Itemplate;
  const msg = new MessagesServices(recipent);
  try {
    await msg.sendTemplate(template);
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
const sendTemplateOneVar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const recipent = req.body.recipent as string;
  const gotVar = req.body.varName as string;
  const templateName = req.body.templateName as keyof typeof savedTemplates;
  const template: Itemplate = savedTemplates[templateName] as Itemplate;
  if (template.components) {
    if (template.components[0].parameters[0].type === "text")
      template.components[0].parameters[0].text = gotVar;
  }
  const msg = new MessagesServices(recipent);
  try {
    await msg.sendTemplate(template);
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

const sendTemplateOneVarImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const recipent = req.body.recipent as string;
  const gotVar = req.body.varName as string;
  const imgLink = req.body.imgLink as string;
  const templateName = req.body.templateName as keyof typeof savedTemplates;
  const template: Itemplate = savedTemplates[templateName] as Itemplate;
  if (template.components) {
    if (template.components[0].parameters[0].type === "image") {
      template.components[0].parameters[0].image.link = imgLink;
    }
    if (template.components[0].parameters[0].type === "document") {
      template.components[0].parameters[0].document.link = imgLink;
    }
    if (template.components[1]) {
      if (template.components[1].parameters[0].type === "text") {
        template.components[1].parameters[0].text = gotVar;
      }
    }
  }

  const msg = new MessagesServices(recipent);
  try {
    await msg.sendTemplate(template);
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

const getAllMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  AWS.config.update(AWSConfig.aws_remote_config);

  const docClient = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: AWSConfig.aws_table_name
  };

  docClient.scan(params, function (err, data) {
    if (err) {
      console.log(err);
      res.send({
        success: false,
        message: err
      });
    } else {
      const { Items } = data;
      res.send({
        success: true,
        movies: Items
      });
    }
  });
};

const getDistinctConversation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  AWS.config.update(AWSConfig.aws_remote_config);

  const docClient = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: AWSConfig.aws_table_name,
    ProjectionExpression: "sender"
  };

  docClient.scan(params, function (err, data) {
    if (err) {
      console.log(err);
      res.send({
        success: false,
        message: err
      });
    } else {
      const { Items } = data;
      res.send({
        success: true,
        movies: Items
      });
    }
  });
};

export {
  sendMessageToNumber,
  sendstaticTemplate,
  sendTemplateOneVar,
  sendTemplateOneVarImage,
  getAllMessages,
  getDistinctConversation
};
