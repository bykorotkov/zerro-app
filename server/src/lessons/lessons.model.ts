import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { User } from "../users/users.model"

interface LessonsModel {
    id: number;
    title: string;
    subject: string;
    description: string;
    duration: number;
    url: string;
    teacherId: number;
}

@Table({
    tableName: "lessons",
    timestamps: false
})
export class Lesson extends Model<Lesson, LessonsModel> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    title: string;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    subject: string;

    @Column({ type: DataType.STRING, unique: false, allowNull: true })
    description: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    duration: number;

    @Column({ type: DataType.STRING, unique: false, allowNull: false })
    url: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    teacherId: number;

    @BelongsTo(() => User)
    teacher: User;
}