import { Connection } from 'mongoose';
import { MongoConstants } from './constants.mongo';
import { createLinksModel } from '../schemas/links.schema';


export const mongoDbModelsProvider = [
	{
		provide: MongoConstants.LINK_MODEL,
		useFactory: (connection: Connection) => createLinksModel(connection),
		inject: [MongoConstants.MONGO_DB_PROVIDER]
	},
	


];


