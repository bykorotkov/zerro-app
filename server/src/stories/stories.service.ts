import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Story } from "./stories.model";
import { CreateStoryDto } from "./dto/create-story.dto";
import { User } from "../users/users.model";
import { UsersService } from "../users/users.service";

@Injectable()
export class StoriesService {
    constructor(
        @InjectModel(Story) private storyRepository: typeof Story,
        private userService: UsersService,
    ) {}

    async create(dto: CreateStoryDto): Promise<Story> {
        const author = await this.userService.getUserById(dto.userId);
        if (!author) {
            throw new Error("Пользователь не найден");
        }

        const story = await this.storyRepository.create({
            userId: dto.userId,
            username: dto.username,
            userAvatar: dto.userAvatar,
            userVideo: dto.userVideo,
            views: dto.views ?? 0,
        });

        return this.storyRepository.findByPk(story.id, {
            include: [{ model: User, as: "author" }],
        });
    }

    async getStories() {
        return this.storyRepository.findAll({
            include: [
                {
                    model: User,
                    as: "author",
                    attributes: ["id", "username", "email", "phone", "banned", "banReason", "createdAt", "updatedAt"],
                },
            ],
            order: [["createdAt", "DESC"]],
        });
    }
}
