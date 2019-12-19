import { IsDefined, IsEmail, IsString, MaxLength } from 'class-validator';

export class UserDto {
    @IsDefined()
    @IsString()
    @MaxLength(30)
    firstName: string;

    @IsDefined()
    @MaxLength(30)
    @IsString()
    lastName: string;

    @IsDefined()
    @MaxLength(50)
    @IsEmail()
    email: string;

    @IsDefined()
    @MaxLength(30)
    @IsString()
    password: string;
}
