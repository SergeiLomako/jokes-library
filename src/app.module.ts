import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { MongoModule } from './mongo/mongo.module';
import { HashModule } from './hash/hash.module';

@Module({
    imports: [ConfigModule, MongoModule, HashModule],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule {}
