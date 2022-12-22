import { AxiosError, AxiosResponse } from "axios";
import facebookAxios from "../interceptors/facebookAxios.interceptor";
import { ITemplateMessage, Itemplate } from "../types/ITemplate";

interface IMessageService {
  recipent: string;

  sendMessage(messageBody: string): Promise<AxiosResponse | AxiosError>;
  sendTemplate(template: Itemplate): Promise<AxiosResponse | AxiosError>;
}

export class MessagesServices implements IMessageService {
  recipent: string;

  constructor(recipent: string) {
    this.recipent = recipent;
  }
  async sendTemplate(template: Itemplate) {
    try {
      const data: ITemplateMessage = {
        messaging_product: "whatsapp",
        to: this.recipent,
        type: "template",
        template: template
      };

      const response = await facebookAxios.post("/messages", data);
      return response.data;
    } catch (err) {
      return err;
    }
  }

  async sendMessage(messageBody: string) {
    try {
      const data = {
        messaging_product: "whatsapp",
        to: this.recipent,
        type: "text",
        text: {
          body: messageBody
        }
      };

      const response = await facebookAxios.post("/messages", data);
      return response.data;
    } catch (err) {
      return err;
    }
  }
}
