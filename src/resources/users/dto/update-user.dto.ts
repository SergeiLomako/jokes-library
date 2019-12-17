import { IsEmail, IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @MaxLength(30)
    firstName: string;

    @IsOptional()
    @IsString()
    @MaxLength(30)
    lastName: string;

    @IsOptional()
    @IsEmail()
    @MaxLength(30)
    email: string;

    @IsOptional()
    @IsString()
    @MaxLength(30)
    password: string;
}
