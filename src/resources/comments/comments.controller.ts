import { Controller, Post, Put, Body, UseGuards, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comment.dto';
import { MongoIdDto } from '../../common/dto/mongo-id.dto';
import { Comment } from './interfaces/comment.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('comments')
@UseGuards(AuthGuard('jwt'))
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Post()
    async store(@Body() payload: CommentDto): Promise<Comment> {
        return this.commentsService.create(payload);
    }

    @Put(':id')
    async update(@Param() params: MongoIdDto, @Body() payload: CommentDto): Promise<Comment> {
        return this.commentsService.updateOrFail(params.id, payload);
    }
}
