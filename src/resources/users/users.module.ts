import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UserSchema } from './schemas/user.schema';
import { HashModule } from '../../services/hash/hash.module';
import {HashService} from '../../services/hash/hash.service';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: 'User',
            schema: UserSchema,
        }]),
        HashModule,
    ],
    providers: [UsersService],
    exports: [UsersService],
})

export class UsersModule {}
