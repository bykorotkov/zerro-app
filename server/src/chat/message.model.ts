import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '../users/users.model';
import { Conversation } from './conversation.model';

interface MessageCreationAttr {
    conversationId: number;
    authorId: number;
    content: string;
}

@Table({
    tableName: `messages`
})
export class Message extends Model<Message, MessageCreationAttr> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => Conversation)
    @Column({ type: DataType.INTEGER, allowNull: false })
    conversationId: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    authorId: number;

    @Column({ type: DataType.TEXT, allowNull: false })
    content: string;

    @BelongsTo(() => Conversation)
    conversation: Conversation;

    @BelongsTo(() => User)
    author: User;
}
