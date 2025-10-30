import { Controller, Get, Param, UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "../auth/jwt-auth.guard"
import { LessonsService } from "./lessons.service"

@Controller('lessons')
export class LessonsController {
    constructor(private lessonService: LessonsService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getLessons() {
        return this.lessonService.getLessons();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getLessonById(@Param('id') id: number) {
        return this.lessonService.getLessonById(id)
    }
}
