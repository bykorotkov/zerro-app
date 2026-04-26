import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.model";

interface StoryCreationAttr {
    userId: number;
    username: string;
    userAvatar: string;
    userVideo: string;
    views?: number;
}

@Table({ tableName: "stories" })
export class Story extends Model<Story, StoryCreationAttr> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;

    @Column({ type: DataType.STRING, allowNull: false })
    username: string;

    @Column({ type: DataType.STRING, allowNull: false })
    userAvatar: string;

    @Column({ type: DataType.STRING, allowNull: false })
    userVideo: string;

    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    views: number;

    @BelongsTo(() => User)
    author: User;
}
