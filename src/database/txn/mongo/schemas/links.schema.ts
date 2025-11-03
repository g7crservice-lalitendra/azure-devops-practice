import { Connection, Schema, SchemaTypes } from 'mongoose';
import { mongo_ts_opts } from 'src/core/utils/timestamp.utils';


const LinksSchema = new Schema<any>(
	{
		name: { type: SchemaTypes.String, required: true },
		start_ts: { type: SchemaTypes.Number, required: true },
		end_ts: { type: SchemaTypes.Number, required: true },
		ref_uid: { type: SchemaTypes.ObjectId, required: true },
		created_at: { type: SchemaTypes.Number },
		updated_at: { type: SchemaTypes.Number }
	},
	mongo_ts_opts
);

const createLinksModel: (conn: Connection) => any = (conn: Connection) => conn.model<any>('Link', LinksSchema, 'Links');

export { createLinksModel, LinksSchema };
