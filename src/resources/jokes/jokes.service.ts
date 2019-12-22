import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Joke } from './interfaces/joke.interface';
import { CommentsService } from '../comments/comments.service';
import { ConfigService } from '../../services/config/config.service';

@Injectable()
export class JokesService {
    constructor(
        @InjectModel('Joke') private readonly jokeModel: Model<Joke>,
        private readonly configService: ConfigService,
        private readonly commentsService: CommentsService,
    ) {}

    async findAll({
        page = 1,
        limit = +this.configService.get('LIMIT'),
        search,
    }): Promise<any> {
        let query = {};

        if (search) {
            query = {joke: {$regex: new RegExp(search.toLowerCase(), 'i')}};
        }

        return await this.jokeModel.paginate(query, {
            page,
            limit,
            sort: { createdAt: -1 },
            select: 'joke',
        });
    }

    async findByIdOrFail(id: string): Promise<Joke> {
        const [joke] = await this.jokeModel.aggregate([
            {
                $match: { _id: Types.ObjectId(id) },
            },
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'joke',
                    as: 'comment',
                },
            },
            {
                $unwind: {
                    path: "$comment",
                    preserveNullAndEmptyArrays: true,
                }
            },
            {
                $sort: {
                    "comment.createdAt": -1,
                }
            },
            {
                $group: {
                    _id: "$_id",
                    joke: { $first: "$joke" },
                    comments: {
                        $push: "$comment",
                    }
                }
            },
            {
                $project: {
                    joke: 1,
                    ['comments._id']: 1,
                    ['comments.joke']: 1,
                    ['comments.user']: 1,
                    ['comments.comment']: 1,
                }
            },
        ]);

        if (!joke) {
            throw new NotFoundException();
        }

        return joke;
    }

    async create(joke: Joke): Promise<Joke> {
        return await this.jokeModel.create(joke);
    }

    async createMany(jokes: Joke[]): Promise<any> {
        return await this.jokeModel.insertMany(jokes);
    }

    async updateOrFail(id: string, payload): Promise<Joke> {
        const updatedJoke = await this.jokeModel.findByIdAndUpdate(id, payload, { new: true });

        if (!updatedJoke) {
            throw new NotFoundException();
        }

        return updatedJoke;
    }

    async delete(id): Promise<any> {
        await this.jokeModel.findByIdAndDelete(id);
        return await this.commentsService.deleteManyByJokeId(id);
    }
}
