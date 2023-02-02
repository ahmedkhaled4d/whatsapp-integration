import { Iconfig } from "./types/IConfig";

const AWSConfig: Iconfig = {
  aws_table_name: "takweed-messages",
  aws_remote_config: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: "us-east-1"
  }
};

export { AWSConfig };
