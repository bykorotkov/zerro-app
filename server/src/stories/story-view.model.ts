import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.model";
import { Story } from "./stories.model";

interface StoryViewCreationAttr {
    userId: number;
    storyId: number;
    seenPartIds: number[];
}

@Table({
    tableName: `story_views`,
    indexes: [{ unique: true, fields: [`userId`, `storyId`] }],
})
export class StoryView extends Model<StoryView, StoryViewCreationAttr> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;

    @ForeignKey(() => Story)
    @Column({ type: DataType.INTEGER, allowNull: false })
    storyId: number;

    @Column({ type: DataType.JSONB, allowNull: false, defaultValue: [] })
    seenPartIds: number[];

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Story)
    story: Story;
}
