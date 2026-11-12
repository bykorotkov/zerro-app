import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { ConversationMember } from './conversation-members.model';
import { Conversation } from './conversation.model';
import { Message } from './message.model';

@Module({
    imports: [SequelizeModule.forFeature([Conversation, ConversationMember, Message, User])],
    exports: [SequelizeModule]
})
export class ChatModule {}
