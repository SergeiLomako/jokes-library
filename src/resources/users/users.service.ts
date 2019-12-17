import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HashService } from '../../services/hash/hash.service';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        private readonly hashService: HashService,
    ) {}

    async create(user: User): Promise<User> {
        user.password = await this.hashService.make(user.password);
        const createdUser = new this.userModel(user);
        return await createdUser.save();
    }

    async update(id: string, user: User): Promise<User> {
        if (user.password) {
            user.password = await this.hashService.make(user.password);
        }

        return await this.userModel.findByIdAndUpdate(id, user, { new: true });
    }

    async findByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({ email });
    }
}
