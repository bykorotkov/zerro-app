import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { User } from '../users/users.model';
import { StoryView } from './story-view.model';

export interface StoryPartJson {
	id: number;
	userId: number;
	username: string;
	userAvatar: string;
	userVideo: string;
	timestamp: string;
	views: number;
}

interface StoryCreationAttr {
	userId: number;
	username: string;
	userAvatar: string;
	parts: StoryPartJson[];
}

@Table({ tableName: `stories` })
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

	@Column({ type: DataType.JSONB, allowNull: false, defaultValue: [] })
	parts: StoryPartJson[];

	@BelongsTo(() => User)
	author: User;

	@HasMany(() => StoryView)
	views: StoryView[];
}
