import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { StoriesService } from "./stories.service";
import { CreateStoryDto } from "./dto/create-story.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("stories")
export class StoriesController {
    constructor(private readonly storiesService: StoriesService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    createStory(@Body() dto: CreateStoryDto) {
        return this.storiesService.create(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getStories() {
        return this.storiesService.getStories();
    }
}
