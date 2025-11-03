import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication) => {
	const config = new DocumentBuilder().setTitle('Links API Documentation').setVersion('1.0').addBearerAuth().build();
	const swaggerDoc = SwaggerModule.createDocument(app, config);

	const customOptions: SwaggerCustomOptions = {
		customSiteTitle: 'Links'
	};
	SwaggerModule.setup('api/docs/swagger', app, swaggerDoc, customOptions);
};
