interface Ilanguage {
  code: string;
}

interface Icurrency {
  type: "currency";
  currency: {
    fallback_value: string;
    code: string;
    amount_1000: number;
  };
}

interface Idate {
  type: "date_time";
  date_time: {
    fallback_value: string;
    day_of_week: number;
    day_of_month: number;
    year: number;
    month: number;
    hour: number;
    minute: number;
    timestamp: number;
  };
}

interface Itext {
  type: "text";
  text: string;
}

interface Iimage {
  type: "image";
  image: {
    link: string;
  };
}

interface Ipayload {
  type: "payload";
  payload: "PAYLOAD";
}

interface Ibutton {
  type: "button";
  sub_type: string;
  index: string;
  parameters: [Ipayload];
}

interface Icomponents {
  type: string;
  parameters: [Itext | Icurrency | Idate | Iimage | Ibutton];
}
export interface Itemplate {
  name: string;
  language: Ilanguage;
  components?: Array<Icomponents>;
}

export interface ITemplateMessage {
  messaging_product: "whatsapp";
  recipient_type: string;
  to: string;
  type: "template";
  template: Itemplate;
}
