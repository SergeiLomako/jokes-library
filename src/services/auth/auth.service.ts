import { Injectable } from '@nestjs/common';
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

    async validateUser(payload: LoginDto): Promise<User | null> {
        const { email, password } = payload;
        let result = null;
        const user = await this.userService.findByField('email', email);
        const passwordsMatch = user && await this.hashService.compare(password, user.password);

        if (passwordsMatch) {
            result = user;
        }

        return result;
    }

    async login(user: User): Promise<any> {
        const { _id, email, firstName, lastName } = user;
        return {
            access_token: this.jwtService.sign({ sub: _id }),
            email,
            firstName,
            lastName,
        };
    }
}
