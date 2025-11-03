import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import coreBootstrap from './core/bootstrap';

async function bootstrap() {
  const app = await NestFactory.create(AppModule),
  configObj = app.get(ConfigService),
		PORT = configObj.get('appPort');
    coreBootstrap(app, configObj);
  await app.listen(process.env.PORT ?? 8000);
  console.log(PORT,'ppppppppppppppppppppppppppppppppppp')
}
bootstrap();
