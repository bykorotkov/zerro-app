import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize"
import { Lesson } from "./lessons.model"

@Injectable()
export class LessonsService {
    constructor(@InjectModel(Lesson) private lessonRepository: typeof Lesson) {}

    async getLessons() {
        return this.lessonRepository.findAll();
    }

    async getLessonById(id: number): Promise<Lesson> {
        return this.lessonRepository.findOne({
            where: { id },
        })
    }
}
