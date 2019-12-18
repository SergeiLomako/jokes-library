import { Injectable, BadRequestException } from '@nestjs/common';
import { HashService } from '../hash/hash.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../resources/users/interfaces/user.interface';
import { UsersService } from '../../resources/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly hashService: HashService,
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(payload: LoginDto): Promise<any> {
        const { email, password } = payload;
        let result = null;
        const user = await this.userService.findByField('email', email);

        if (user && this.hashService.compare(password, user.password)) {
            result = user;
        }

        return result;
    }

    async login(user: User): Promise<any> {
        return {
            access_token: this.jwtService.sign({ sub: user._id }),
        };
    }
}
