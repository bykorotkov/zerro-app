import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto, LoginUserDto} from "../users/dto/create-user-dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import {User} from "../users/users.model";
import {Token} from "../tokens/token.model";
import {InjectModel} from "@nestjs/sequelize";
@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        @InjectModel(Token)
        private tokenModel: typeof Token
    ) {}

    async login(userDto: LoginUserDto) {
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

        return {message: 'Пользователь успешно зарегистрирован'}
    }

    async logout(token: string) {
        let userId

        try {
            const decoded = this.jwtService.decode(token)
            userId = decoded.id
        } catch (e) {
            throw new HttpException('Неверный токен', HttpStatus.UNAUTHORIZED);
        }

        const user = await this.userService.getUserById(userId)
        if (!user) {
            throw new HttpException('Пользователь с таким email не существует', HttpStatus.BAD_REQUEST)
        }

        await this.tokenModel.destroy({where: {userId: user.id} })
        return { message: 'Вы успешно вышли из системы' }
    }

    private async generateTokens(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles}

        const accessToken = this.jwtService.sign(payload, { expiresIn: `15m`})
        const refreshToken = this.jwtService.sign(payload, { expiresIn: `7d`})

        await this.saveToken(user.id, accessToken, refreshToken)

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId: number, accessToken: string, refreshToken: string) {
        await this.tokenModel.destroy({ where: { userId } });

        const token = await this.tokenModel.create({ userId, accessToken, refreshToken });
        return token;
    }

    private async generateAccessToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles}

        const accessToken = this.jwtService.sign(payload, { expiresIn: `15m`})

        await this.saveAccessToken(user.id, accessToken)

        return {
            accessToken
        }
    }

    async saveAccessToken(userId: number, accessToken: string) {
        await this.tokenModel.update(
            { accessToken }, // новые данные
            { where: { userId } } // условие поиска
        );

        return await this.tokenModel.findOne({ where: { userId } });
    }

    async refresh(refreshToken: string) {
        const userId = await this.verifyRefreshToken(refreshToken)

        if (!userId) {
            await this.logout(refreshToken)
            throw new UnauthorizedException({message: 'Недействительный refresh токен'})
        }

        const user = await this.userService.getUserById(userId)
        return this.generateAccessToken(user)
    }

    private async verifyRefreshToken(refreshToken: string): Promise<number | null> {
        try {
            const payload = this.jwtService.verify(refreshToken)
            return payload.id
        } catch (e) {
            return null
        }
    }

    private async validateUser(userDto: LoginUserDto) {
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
