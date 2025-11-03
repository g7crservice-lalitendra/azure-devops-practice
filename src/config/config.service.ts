import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: any };

  constructor() {
    this.envConfig = {
      appPort: parseInt(process.env.APP_PORT ?? '8000', 10),
     
    };

    // If needed, include database URIs, etc.
    this.envConfig.db = {
      mongo: {
        uri: process.env.APP_CONNECTIONSTRING_MONGO ?? '',
      },
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
