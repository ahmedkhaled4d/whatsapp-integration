import { AxiosError, AxiosResponse } from "axios";
import facebookAxios from "../interceptors/facebookAxios.interceptor";
import { IMessage, Itemplate } from "../types/ITemplete";

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
  async sendTemplate(template: Itemplate): Promise<AxiosResponse | AxiosError> {
    try {
      const data: IMessage = {
        messaging_product: "whatsapp",
        to: this.recipent,
        type: "template",
        template: template
      };

      const response = await facebookAxios.post("/messages", data);
      return response.data;
    } catch (err: any) {
      throw Error(err);
    }
  }

  async sendMessage(messageBody: string): Promise<AxiosResponse | AxiosError> {
    try {
      const data = JSON.stringify({
        messaging_product: "whatsapp",
        to: this.recipent,
        type: "text",
        text: {
          body: messageBody
        }
      });

      const response = await facebookAxios.post("/messages", data);
      return response.data;
    } catch (err: any) {
      throw Error(err);
    }
  }
}
