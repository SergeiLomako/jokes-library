import { IsDefined, IsEmail, IsString, MaxLength } from 'class-validator';

export class LoginDto {
    @IsDefined()
    @MaxLength(50)
    @IsEmail()
    email: string;

    @IsDefined()
    @MaxLength(30)
    @IsString()
    password: string;
}
