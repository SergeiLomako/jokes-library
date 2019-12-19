import { Module } from '@nestjs/common';

import { JokeSeed } from './jokes.seed';
import { JokesModule } from '../../resources/jokes/jokes.module';
import { MongoModule } from '../mongo.module';

@Module({
    imports: [MongoModule, JokesModule],
    providers: [JokeSeed],
})

export class SeedsModule {}
