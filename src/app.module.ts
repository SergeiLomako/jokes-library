import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './services/config/config.module';
import { MongoModule } from './database/mongo.module';
import { HashModule } from './services/hash/hash.module';

@Module({
    imports: [ConfigModule, MongoModule, HashModule],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule {}
