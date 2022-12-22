interface Itext {
  body: string;
}
interface ImessageArr {
  from: string;
  id: string;
  timestamp: string;
  text: Itext;
  type: string;
}

interface Imetadata {
  display_phone_number: string;
  phone_number_id: string;
}

interface Iprofile {
  name: string;
  wa_id: string;
}

interface Icontact {
  profile: Iprofile;
}

interface Ivalue {
  messaging_product: string;
  metadata: Imetadata;
  contacts: [Icontact];
  messages: [ImessageArr];
}

interface Ichange {
  value: Ivalue;
  field: string;
}

interface Ientry {
  id: string;
  changes: [Ichange];
}

export interface Imessage {
  object: string;
  entry: [Ientry];
}
