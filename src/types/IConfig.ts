interface IremoteConfig {
  accessKeyId?: string;
  secretAccessKey?: string;
  region: string;
}

export interface Iconfig {
  aws_table_name: string;
  aws_remote_config: IremoteConfig;
}
