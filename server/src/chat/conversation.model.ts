import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ConversationMember } from './conversation-members.model';
import { Message } from './message.model';

export type ConversationType = `direct` | `saved`;

interface ConversationCreationAttr {
    type: ConversationType;
}

@Table({ tableName: `conversations` })
export class Conversation extends Model<Conversation, ConversationCreationAttr> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    type: ConversationType;

    @HasMany(() => ConversationMember)
    members: ConversationMember[];

    @HasMany(() => Message)
    messages: Message[];
}
