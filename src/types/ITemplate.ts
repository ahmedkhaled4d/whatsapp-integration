type messageType = "template" | "text";

interface Ilanguage {
  code: string;
}

export interface Itemplate {
  name: string;
  language: Ilanguage;
}

export interface ITemplateMessage {
  messaging_product: "whatsapp";
  to: string;
  type: messageType;
  template: Itemplate;
}
