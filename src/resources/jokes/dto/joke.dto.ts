import { IsDefined, IsString, MaxLength } from 'class-validator';

export class JokeDto {
    @IsDefined()
    @IsString()
    @MaxLength(300)
    joke: string;
}
