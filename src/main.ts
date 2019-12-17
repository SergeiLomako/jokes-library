import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(bodyParser.json({limit: '1mb'}));
    app.use(bodyParser.urlencoded({
        limit: '1mb',
        extended: true,
    }));
    app.enableCors();
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
