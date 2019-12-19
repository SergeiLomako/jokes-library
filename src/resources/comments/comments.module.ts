import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsService } from './comments.service';
import { CommentSchema } from './comment.schema';
import { CommentsController } from './comments.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: 'Comment',
            schema: CommentSchema,
        }]),
    ],
    providers: [CommentsService],
    controllers: [CommentsController],
})

export class CommentsModule {}
