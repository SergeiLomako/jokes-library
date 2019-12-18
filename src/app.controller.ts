import { Controller, Get, Post, Body, BadRequestException, HttpCode, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { UsersService } from './resources/users/users.service';
import { LoginDto } from './services/auth/dto/login.dto';
import { CreateUserDto } from './resources/users/dto';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ) {}

    @Get()
    index(): string {
        return 'Jokes API Version 1.0.0';
    }

    @HttpCode(200)
    @Post('/login')
    async login(@Body() payload: LoginDto): Promise<any> {
        const user = await this.authService.validateUser(payload);
        if (!user) {
            throw new BadRequestException('Invalid credentials');
        }

        return this.authService.login(user);
    }

    @Post('/register')
    async register(@Body() payload: CreateUserDto): Promise<string> {
        const emailExists = await this.usersService.findByField('email', payload.email);

        if (emailExists) {
            throw new BadRequestException('Email already exist');
        }

        const user = await this.usersService.create(payload);

        return this.authService.login(user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/me')
    async me(@Request() req) {
        return req.user;
    }
}
