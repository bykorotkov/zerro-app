import {forwardRef, Module} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {Post} from "./posts.model";
import {FilesModule} from "../files/files.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [
      SequelizeModule.forFeature([User, Post]),
      FilesModule,
      forwardRef(() => AuthModule)
  ]
})
export class PostsModule {}
