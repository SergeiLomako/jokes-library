import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './services/config/config.module';
import { MongoModule } from './database/mongo.module';
import { HashModule } from './services/hash/hash.module';
import { AuthModule } from './services/auth/auth.module';

@Module({
    imports: [ConfigModule, MongoModule, HashModule, AuthModule],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule {}
