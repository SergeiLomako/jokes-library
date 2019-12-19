import { IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class ParamsDto {
    @IsOptional()
    @IsString()
    search: string;

    @Transform(id => +id)
    @IsOptional()
    @IsNumber()
    @Min(1)
    page: number;

    @Transform(id => +id)
    @IsOptional()
    @IsNumber()
    @Min(1)
    limit: number;
}
