import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Story } from "./stories.model";
import { StoriesService } from "./stories.service";
import { StoriesController } from "./stories.controller";
import { UsersModule } from "../users/users.module";
import { User } from "../users/users.model";

@Module({
    imports: [SequelizeModule.forFeature([Story, User]), UsersModule],
    providers: [StoriesService],
    controllers: [StoriesController],
    exports: [StoriesService],
})
export class StoriesModule {}
