import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../../services/config/config.module';
import { JokesService } from './jokes.service';
import { JokesController } from './jokes.controller';
import JokeSchema from './joke.schema';

@Module({
    imports: [
        ConfigModule,
        MongooseModule.forFeature([{
            name: 'Joke',
            schema: JokeSchema,
        }]),
    ],
    providers: [JokesService],
    controllers: [JokesController],
})
export class JokesModule {}
