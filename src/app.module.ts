import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './services/config/config.module';
import { MongoModule } from './database/mongo.module';
import { HashModule } from './services/hash/hash.module';
import { AuthModule } from './services/auth/auth.module';
import { UsersModule } from './resources/users/users.module';
import { JokesModule } from './resources/jokes/jokes.module';
import { CommentsModule } from './resources/comments/comments.module';
import { CommandModule } from 'nestjs-command';
import { JokeSeed } from './database/seeds/jokes.seed';

@Module({
    imports: [
        ConfigModule,
        MongoModule,
        HashModule,
        AuthModule,
        UsersModule,
        JokesModule,
        CommentsModule,
        CommandModule,
    ],
    controllers: [AppController],
    providers: [AppService, JokeSeed],
})

export class AppModule {}
