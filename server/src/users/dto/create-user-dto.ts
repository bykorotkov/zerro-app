import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {

    @ApiProperty({example: 'username', description: 'Имя пользователя'})
    @IsString({message: 'Должно быть строкой'})
    @Length(1, 20,{message: 'Имя не может быть менее 1 символа'})
    readonly username: string;

    @ApiProperty({example: 'username', description: 'Имя пользователя'})
    @IsString({message: 'Должно быть строкой'})
    @Length(1, 20,{message: 'Имя не может быть менее 1 символа'})
    readonly phone: string;

    @ApiProperty({example: 'user@mail.ru', description: 'Почта'})
    @IsString({message: 'Должно быть строкой'})
    @IsEmail({}, {message: 'Некорректный email'})
    readonly email: string;

    @ApiProperty({example: '123456', description: 'Пароль'})
    @IsString({message: 'Должно быть строкой'})
    @Length(4, 16, {message: 'Пароль должен быть не менее 4 символов и не более 16'})
    readonly password: string
}