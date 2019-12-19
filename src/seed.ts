import { NestFactory } from '@nestjs/core';
import { SeedsModule } from './database/seeds/seeds.module';
import { JokeSeed } from './database/seeds/jokes.seed';

(async function bootstrap() {
    try {
        const app = await NestFactory.createApplicationContext(SeedsModule);
        const jokeSeeder = app.get(JokeSeed);
        await jokeSeeder.seed();
        await app.close();
    } catch (e) {
        console.log(e);
    }
})();
