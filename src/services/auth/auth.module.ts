import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../../resources/users/users.module';
import { HashModule } from '../hash/hash.module';

@Module({
    imports: [UsersModule, HashModule],
    providers: [AuthService],
    exports: [AuthService],
})

export class AuthModule { }
