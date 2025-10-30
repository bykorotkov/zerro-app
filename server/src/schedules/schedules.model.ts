import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { User } from "../users/users.model"
import { Lesson } from "../lessons/lessons.model"

interface SchedulesModel {
    userId: number;
    lessonId: number;
    scheduledData: Date;
    scheduledTime: string;
    isCompleted: boolean;
}

@Table({ tableName: 'schedules' })
export class Schedule extends Model<Schedule, SchedulesModel> {
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;

    @ForeignKey(() => Lesson)
    @Column({ type: DataType.INTEGER })
    lessonId: number;

    @Column({ type: DataType.DATE, allowNull: false })
    scheduledDate: Date; // на какую дату назначен урок

    @Column({ type: DataType.TIME, allowNull: true })
    scheduledTime: string; // конкретное время (например: "14:30")

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    isCompleted: boolean; // выполнен ли урок

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Lesson)
    lesson: Lesson;
}