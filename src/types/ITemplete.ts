type messageType = "template" | "text";

interface language {
  code: string;
}

export interface Itemplate {
  name: string;
  language: language;
}

export interface IMessage {
  messaging_product: "whatsapp";
  to: string;
  type: messageType;
  template: Itemplate;
}
