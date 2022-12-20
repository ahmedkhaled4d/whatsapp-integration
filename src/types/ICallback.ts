interface Itext {
  body: string;
}

interface Imessage {
  from: string;
  text: Itext;
}

interface Imetadata {
  phone_number_id: string;
}

interface Ivalue {
  verb: string;
  object_Id: string;
  messages: [Imessage];
  metadata: Imetadata;
}

interface Ichange {
  value: Ivalue;
  field: string;
}

interface Ientry {
  changes: [Ichange];
  id: string;
  time: string;
  uid: string;
}

export interface Icallback {
  object: string;
  entry: [Ientry];
}
