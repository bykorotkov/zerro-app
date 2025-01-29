import {Body, Controller, Post, Headers, HttpStatus, HttpException} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {CreateUserDto, LoginUserDto} from "../users/dto/create-user-dto";
import {AuthService} from "./auth.service";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() userDto: LoginUserDto) {
        return this.authService.login(userDto)
    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }

    @Post('/logout')
    logout(@Headers('authorization') authHeader: string) {
        const token = authHeader?.split(' ')[1]
        if (!token) {
            throw new HttpException('Токена не содержится в запросе', HttpStatus.UNAUTHORIZED);
        }
        return this.authService.logout(token)
    }

    @Post('/refresh')
    refresh(@Headers('authorization') refreshToken: string) {
        return this.authService.refresh(refreshToken);
    }
}
