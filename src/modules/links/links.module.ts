import { Module } from '@nestjs/common';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';
import { DatabaseModule } from 'src/database/database.module';
import { AbstractLinksSvc } from './links.abstract';

@Module({
  imports: [DatabaseModule],
  controllers: [LinksController],
  providers: [
    {
			provide: AbstractLinksSvc,
			useClass: LinksService
		},
  ],
})
export class LinksModule {}
