import { Injectable, NotFoundException, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import * as bcrypt from "bcryptjs";
import { Story } from "./stories.model";
import { StoryView } from "./story-view.model";
import { CreateStoryDto } from "./dto/create-story.dto";
import { User } from "../users/users.model";
import { STORY_SEEDS, buildAvatarUrl, buildParts } from "./stories.seed";

@Injectable()
export class StoriesService implements OnModuleInit {
    constructor(
        @InjectModel(Story) private storyRepository: typeof Story,
        @InjectModel(StoryView) private storyViewRepository: typeof StoryView,
        @InjectModel(User) private userRepository: typeof User,
    ) {}

    async onModuleInit() {
        await this.ensureStoriesSchema();
        await this.seedStoriesIfEmpty();
    }

    async create(dto: CreateStoryDto, userId: number): Promise<Story> {
        const author = await this.userRepository.findByPk(userId);
        if (!author) {
            throw new NotFoundException(`Пользователь не найден`);
        }

        const story = await this.storyRepository.create({
            userId,
            username: dto.username || author.username,
            userAvatar: dto.userAvatar,
            parts: dto.parts.map((part) => ({
                ...part,
                userId,
                views: part.views ?? 0,
            })),
        });

        return this.storyRepository.findByPk(story.id);
    }

    async getStories(viewerUserId: number) {
        const stories = await this.storyRepository.findAll({
            order: [[`createdAt`, `DESC`]],
        });

        const views = await this.storyViewRepository.findAll({
            where: { userId: viewerUserId },
        });
        const seenByStoryId = new Map(views.map((view) => [view.storyId, view.seenPartIds ?? []]));

        return stories.map((story) => {
            const plain = story.get({ plain: true });
            const seenPartIds = seenByStoryId.get(story.id) ?? [];

            return {
                id: plain.id,
                userId: plain.userId,
                username: plain.username,
                userAvatar: plain.userAvatar,
                createdAt: plain.createdAt,
                updatedAt: plain.updatedAt,
                parts: (plain.parts ?? []).map((part) => ({
                    ...part,
                    isSeen: seenPartIds.includes(part.id),
                })),
            };
        });
    }

    async syncSeen(storyId: number, userId: number, partIds: number[]) {
        const story = await this.storyRepository.findByPk(storyId);
        if (!story) {
            throw new NotFoundException(`История не найдена`);
        }

        const [view] = await this.storyViewRepository.findOrCreate({
            where: { userId, storyId },
            defaults: { userId, storyId, seenPartIds: partIds },
        });

        view.seenPartIds = partIds;
        await view.save();

        return { storyId, seenPartIds: view.seenPartIds };
    }

    private async ensureStoriesSchema() {
        const sequelize = this.storyRepository.sequelize;
        if (!sequelize) {
            return;
        }

        const queryInterface = sequelize.getQueryInterface();

        try {
            const storiesTable = await queryInterface.describeTable(`stories`);
            if (!storiesTable.parts) {
                await queryInterface.dropTable(`story_views`).catch(() => undefined);
                await queryInterface.dropTable(`stories`);
                await this.storyRepository.sync();
                await this.storyViewRepository.sync();
            }
        } catch {
            await this.storyRepository.sync();
            await this.storyViewRepository.sync();
        }

        try {
            await queryInterface.describeTable(`story_views`);
        } catch {
            await this.storyViewRepository.sync();
        }
    }

    private async seedStoriesIfEmpty() {
        const count = await this.storyRepository.count();
        if (count > 0) {
            return;
        }

        const passwordHash = await bcrypt.hash(`seed-password`, 5);

        for (let index = 0; index < STORY_SEEDS.length; index++) {
            const seed = STORY_SEEDS[index];
            const slug = `story-seed-${index + 1}`;
            const email = `${slug}@seed.local`;
            const phone = `8900${String(1000000 + index).slice(1)}`;

            const [user] = await this.userRepository.findOrCreate({
                where: { email },
                defaults: {
                    username: seed.username,
                    email,
                    phone,
                    password: passwordHash,
                },
            });

            const avatarUrl = buildAvatarUrl(seed.avatarFile);
            const parts = buildParts(seed, user.id, avatarUrl, index);

            const story = await this.storyRepository.create({
                userId: user.id,
                username: seed.username,
                userAvatar: avatarUrl,
                parts,
            });

            const seededAt = new Date(seed.timestamp);
            await story.update({ createdAt: seededAt, updatedAt: seededAt }, { silent: true });
        }
    }
}
