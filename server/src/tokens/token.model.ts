import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";

interface TokenCreationAttr {
    userId: number
    accessToken: string
    refreshToken: string
}

@Table({tableName: 'tokens'})
export class Token extends Model<Token, TokenCreationAttr> {
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number

    @Column({type: DataType.TEXT, unique: true, allowNull: false})
    accessToken: string

    @Column({type: DataType.TEXT, unique: true, allowNull: false})
    refreshToken: string
}