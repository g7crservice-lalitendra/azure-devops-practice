import { Module } from '@nestjs/common';
import { LinksModule } from '../links/links.module';
import { DatabaseModule } from 'src/database/database.module';
import { AppController } from './app.controller';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [CoreModule,DatabaseModule, LinksModule],
  controllers: [AppController],
})
export class AppModule {}
