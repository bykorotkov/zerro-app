import { forwardRef, Module } from "@nestjs/common"
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { SequelizeModule } from "@nestjs/sequelize"
import { Lesson } from "./lessons.model"
import { User } from "../users/users.model"
import { AuthModule } from "../auth/auth.module"
import { UsersModule } from "../users/users.module"

@Module({
  imports: [
    SequelizeModule.forFeature([Lesson, User]),
    forwardRef(() => AuthModule),
    UsersModule,
  ],
  controllers: [LessonsController],
  providers: [LessonsService],
  exports: [LessonsService]
})
export class LessonsModule {}
