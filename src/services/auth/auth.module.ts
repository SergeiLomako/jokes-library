import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '../config/config.service';
import { ConfigModule } from '../config/config.module';
import { UsersModule } from '../../resources/users/users.module';
import { HashModule } from '../hash/hash.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        UsersModule,
        HashModule,
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('API_KEY'),
                signOptions: {
                    expiresIn: configService.get('JWT_EXPIRES'),
                },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})

export class AuthModule { }
