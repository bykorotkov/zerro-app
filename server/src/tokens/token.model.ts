import {Column, DataType, Model, Table} from "sequelize-typescript";

interface TokenCreationAttr {
    accessToken: string
    refreshToken: string
    expiresAt?: Date;
}

@Table({tableName: 'tokens'})
export class Token extends Model<Token, TokenCreationAttr> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.TEXT, unique: true, allowNull: false})
    accessToken: string

    @Column({type: DataType.TEXT, unique: true, allowNull: false})
    refreshToken: string

    @Column({type: DataType.DATE})
    expiresAt: Date
}