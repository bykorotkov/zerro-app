import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from "@nestjs/common";
import { StoriesService } from "./stories.service";
import { CreateStoryDto } from "./dto/create-story.dto";
import { SyncStorySeenDto } from "./dto/sync-story-seen.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller(`stories`)
export class StoriesController {
    constructor(private readonly storiesService: StoriesService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    createStory(@Body() dto: CreateStoryDto, @Req() req) {
        return this.storiesService.create(dto, req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getStories(@Req() req) {
        return this.storiesService.getStories(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post(`:storyId/seen`)
    syncSeen(
        @Param(`storyId`, ParseIntPipe) storyId: number,
        @Body() dto: SyncStorySeenDto,
        @Req() req,
    ) {
        return this.storiesService.syncSeen(storyId, req.user.id, dto.partIds ?? []);
    }
}
