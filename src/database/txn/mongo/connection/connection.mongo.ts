import { Connection, createConnection } from 'mongoose';
import { messageFactory, messages } from 'src/shared/messages.shared';
import { MongoConstants } from './constants.mongo';

export const mongoDbProvider = [
	{
		provide: MongoConstants.MONGO_DB_PROVIDER,
		useFactory: (): Connection => {
			const	conn = createConnection(MongoConstants.MONGO_URI);
			// When successfully connected
			conn.on('connected', () => {
        console.log(messages.S2, 200)
		console.log(messages.S1,8000)
			});

			// If the connection throws an error
			conn.on('error', (err) => {
				const serverCrashMsg = messageFactory(messages.E1, [err.message]);
				console.error(serverCrashMsg, 500);
        
			});

			// When the connection is disconnected
			conn.on('disconnected', () => {
				console.error(messages.E2, 500);
			});

			// If the Node process ends, close the Mongoose connection
			// process.on('SIGINT', () => {
			// 	conn.close(() => {
      //     console.log(messages.E3, 500)
			// 		process.exit(0);
			// 	});
			// });
			return conn;
		},
		inject: [ ]
	}
];
