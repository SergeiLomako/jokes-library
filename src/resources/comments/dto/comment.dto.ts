import { IsDefined, IsString, MaxLength, IsMongoId } from 'class-validator';

export class CommentDto {
    @IsDefined()
    @IsString()
    @MaxLength(300)
    comment: string;

    @IsDefined()
    @IsMongoId()
    user: string;

    @IsDefined()
    @IsMongoId()
    joke: string;
}
