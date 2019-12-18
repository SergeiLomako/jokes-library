import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HashService } from '../../services/hash/hash.service';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
    hiddenFields = { password: 0 };

    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        private readonly hashService: HashService,
    ) {}

    async create(user: User): Promise<User> {
        user.password = await this.hashService.make(user.password);

        return await this.userModel.create(user);
    }

    async findByField(field: string, value: string | number): Promise<User | null> {
        return await this.userModel.findOne({ [field]: value });
    }
}
