import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Joke } from './interfaces/joke.interface';
import { ConfigService } from '../../services/config/config.service';

@Injectable()
export class JokesService {
    constructor(
        @InjectModel('Joke') private readonly jokeModel: Model<Joke>,
        private readonly configService: ConfigService,
    ) {}

    async findAll({
        page = 1,
        limit = +this.configService.get('LIMIT'),
        search,
    }): Promise<any> {
        let query = {};

        if (search) {
            query = {joke: {$regex: new RegExp(search)}};
        }

        return await this.jokeModel.paginate(query, { page, limit });
    }

    async findByIdOrFail(id: string): Promise<Joke | null> {
        const joke = await this.jokeModel.findById(id);

        if (!joke) {
            throw new NotFoundException();
        }

        return joke;
    }

    async create(joke: Joke): Promise<Joke> {
        return await this.jokeModel.create(joke);
    }

    async updateOrFail(id: string, payload): Promise<Joke> {
        const updatedJoke = await this.jokeModel.findByIdAndUpdate(id, payload, { new: true });

        if (!updatedJoke) {
            throw new NotFoundException();
        }

        return updatedJoke;
    }

    async delete(id): Promise<any> {
        return await this.jokeModel.findByIdAndDelete(id);
    }
}
