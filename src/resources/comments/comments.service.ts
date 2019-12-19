import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './interfaces/comment.interface';

@Injectable()
export class CommentsService {
    constructor(@InjectModel('Comment') private readonly commentModel: Model<Comment>) {}

    async create(comment: Comment): Promise<Comment> {
        return await this.commentModel.create(comment);
    }

    async updateOrFail(id: string, payload): Promise<Comment> {
        const updatedComment = await this.commentModel.findByIdAndUpdate(id, payload, { new: true });

        if (!updatedComment) {
            throw new NotFoundException();
        }

        return updatedComment;
    }
}
