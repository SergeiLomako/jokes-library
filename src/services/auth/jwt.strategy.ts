import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../resources/users/users.service';
import { ConfigService } from '../config/config.service';
import { User } from '../../resources/users/interfaces/user.interface';
import { JwtPayloadInterface } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly usersService: UsersService,
        private readonly configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('API_KEY'),
        });
    }

    async validate(payload: JwtPayloadInterface): Promise<User> {
        const user = await this.usersService.findByField('_id', payload.sub);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
