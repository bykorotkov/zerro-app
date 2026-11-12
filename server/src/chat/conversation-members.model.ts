import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '../users/users.model';
import { Conversation } from './conversation.model';

interface ConversationMemberCreationAttr {
    conversationId: number;
    userId: number;
}

@Table({
    tableName: `conversation_members`,
    indexes: [{ unique: true, fields: [`conversationId`, `userId`] }]
})
export class ConversationMember extends Model<ConversationMember, ConversationMemberCreationAttr> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => Conversation)
    @Column({ type: DataType.INTEGER, allowNull: false })
    conversationId: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Conversation)
    conversation: Conversation;
}
