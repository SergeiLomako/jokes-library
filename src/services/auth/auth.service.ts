import { Injectable, BadRequestException } from '@nestjs/common';
import { HashService } from '../hash/hash.service';
import { User } from '../../resources/users/interfaces/user.interface';
import { UsersService } from '../../resources/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly hashService: HashService,
        private readonly userService: UsersService,
    ) {}

    async register(user: User): Promise<User> {
        return await this.userService.create(user);
    }

    async login(payload: LoginDto) {
        const user = await this.userService.findByEmail(payload.email);
        if (!user || !this.hashService.compare(payload.password, user.password)) {
            throw new BadRequestException('Invalid credentials');
        }

        return true;
    }
}
