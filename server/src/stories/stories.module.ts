import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { User } from '../users/users.model';
import { UsersModule } from '../users/users.module';
import { StoriesController } from './stories.controller';
import { Story } from './stories.model';
import { StoriesService } from './stories.service';
import { StoryView } from './story-view.model';

@Module({
	imports: [SequelizeModule.forFeature([Story, StoryView, User]), UsersModule, AuthModule],
	providers: [StoriesService],
	controllers: [StoriesController],
	exports: [StoriesService]
})
export class StoriesModule {}
