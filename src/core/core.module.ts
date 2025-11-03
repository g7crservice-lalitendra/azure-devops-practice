import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { exportProvider, getProviders } from './providers';
import { DatabaseModule } from 'src/database/database.module';

@Global()
@Module({
	imports: [ConfigModule.forRoot({ envFilePath: '.env' }),DatabaseModule],
	providers: [...getProviders()],
	exports: [...exportProvider(),DatabaseModule]
})
export class CoreModule { }
