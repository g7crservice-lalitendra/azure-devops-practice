import { Module } from '@nestjs/common';
import { mongoDbProvider } from './txn/mongo/connection/connection.mongo';
import { mongoDbModelsProvider } from './txn/mongo/connection/models.connection.mongo';
import { LinksDao } from './txn/mongo/dao/links.dao';
import { AbstractLinksDao } from './txn/mongo/abstract/links.abstract';
import { DatabaseService } from './databse.service';


@Module({
  providers: [
    ...mongoDbProvider,
    ...mongoDbModelsProvider,
    DatabaseService,
    {
      provide: AbstractLinksDao,   // <-- Add provide here
      useClass: LinksDao,
    },
  ],
  exports: [
    DatabaseService,
    {
      provide: AbstractLinksDao,   // <-- Add provide here
      useClass: LinksDao,
    },  // <-- You can simply export the class directly
  ],
})
export class DatabaseModule {}
