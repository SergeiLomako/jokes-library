import { IsDefined, IsMongoId } from 'class-validator';

export class MongoIdDto {
    @IsDefined()
    @IsMongoId()
    id: string;
}
