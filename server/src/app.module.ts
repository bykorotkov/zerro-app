import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import * as process from 'process';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { ConversationMember } from './chat/conversation-members.model';
import { Conversation } from './chat/conversation.model';
import { Message } from './chat/message.model';
import { FilesModule } from './files/files.module';
import { Lesson } from './lessons/lessons.model';
import { LessonsModule } from './lessons/lessons.module';
import { Post } from './posts/posts.model';
import { PostsModule } from './posts/posts.module';
import { Role } from './roles/roles.model';
import { RolesModule } from './roles/roles.module';
import { UserRoles } from './roles/user-roles.model';
import { Story } from './stories/stories.model';
import { StoriesModule } from './stories/stories.module';
import { StoryView } from './stories/story-view.model';
import { Token } from './tokens/token.model';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, `..`, `static`)
        }),
        SequelizeModule.forRoot({
            dialect: `postgres`,
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role, UserRoles, Post, Token, Lesson, Story, StoryView, Conversation, ConversationMember, Message],
            autoLoadModels: true
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        PostsModule,
        FilesModule,
        LessonsModule,
        StoriesModule,
        ChatModule
    ]
})
export class AppModule {}
