import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';
import { json, urlencoded } from 'express';
import { setupSwagger } from './swagger/doc.swagger';
import { corsOptions } from './cors.config';
import { ConfigService } from '@nestjs/config';

/**
 * Core bootstrap module should be loaded here.
 * @param app
 *
 */

export default async function coreBootstrap(app: INestApplication, configObj: ConfigService) {
	// Global Prefix
	app.setGlobalPrefix('api');

	// middlewares, express specific\
	app.use(json({ limit: '50mb' }));
	app.use(urlencoded({ limit: '50mb', extended: true }));
	

	// CORS configuration
	// app.use(cors(corsOptions));

	// Auto-validation
	// We'll start by binding ValidationPipe at the application level, thus ensuring all endpoints are protected from receiving incorrect data.
	/*Global validation filters*/
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true
		})
	);
	
	
}
