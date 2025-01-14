import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user-dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import {User} from "../users/users.model";
@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}
    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateTokens(user)
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email)
        if (candidate) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password: hashPassword})
        return this.generateTokens(user)
    }

    // private async generateToken(user: User) {
    //     const payload = {email: user.email, id: user.id, roles: user.roles}
    //     return {
    //         token: this.jwtService.sign(payload)
    //     }
    // }

    private async generateTokens(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles}

        const accessToken = this.jwtService.sign(payload, { expiresIn: '15m'})
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d'})

        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    }

    async refresh(refreshToken: string) {
        const userId = await this.verifyRefreshToken(refreshToken)

        if (!userId) {
            throw new UnauthorizedException({message: 'Недействительный refresh токен'})
        }

        const user = await this.userService.getUserById(userId)
        return this.generateTokens(user)
    }

    private async verifyRefreshToken(refreshToken: string): Promise<number | null> {
        try {
            const payload = this.jwtService.verify(refreshToken)
            return payload.id
        } catch (e) {
            return null
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email)
        if (!user) {
            throw new UnauthorizedException({ message: 'Некорректный email или пароль' });
        }
        const passwordEquals = await bcrypt.compare(userDto.password, user.password)
        if (passwordEquals) {
            return user
        }
        throw new UnauthorizedException({message: 'Некорректный email или пароль'})
    }
}
