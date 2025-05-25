import {
    Body,
    Controller,
    Get,
    NotFoundException, Param,
    Post,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {PostsService} from "./posts.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService) {}
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Body() dto: CreatePostDto,
               //НЕОБХОДИМА ДОРАБОТКА С ИЗОБРАЖЕНИЯМИ. Сервер отдает 500, если запрос прилетает без изображения
               // @UploadedFile() image?: any
    ) {
        // if (!image) {
        //     return new Error('Нет изображения')
        // }
        // return this.postService.create(dto, image)
        return this.postService.create(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getPosts() {
        return await this.postService.getPosts()
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getPostById(@Param('id') id: number) {
        const post = await this.postService.findOnePost(id);
        if (!post) {
            throw new NotFoundException('Пост не найден');
        }
        return post;
    }
}
