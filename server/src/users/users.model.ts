import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {Post} from "../posts/posts.model";

interface UserCreationAttr {
    email: string
    password: string
    username: string
    phone: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttr> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'username', description: 'Имя пользователя'})
    @Column({type: DataType.STRING, allowNull: false})
    username: string;

    @ApiProperty({example: '8-(960)-858-00-44', description: 'Имя пользователя'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    phone: string;

    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый адрес'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: '123456', description: 'Пароль'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: 'true', description: 'Забанен или нет'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @ApiProperty({example: 'Оскорбление', description: 'Причина бана'})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    @HasMany(() => Post)
    posts: Post[]
}