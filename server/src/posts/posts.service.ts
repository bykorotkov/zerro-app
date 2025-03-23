import { Injectable } from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Post} from "./posts.model";
import {FilesService} from "../files/files.service";
import {UsersService} from "../users/users.service";

@Injectable()
export class PostsService {

    constructor(@InjectModel(Post) private postRepository: typeof Post,
                private userService: UsersService,
                private fileService: FilesService) {
    }

    // async create(dto: CreatePostDto, image) {
    async create(dto: CreatePostDto) {
        let fileName

        // if (image) {
        //     fileName = await this.fileService.createFile(image)
        // }

        if (!dto.title || !dto.content) {
            throw new Error('Поля обязательны');
        }

        let author
        if (dto.userId) {
            author = await this.userService.getUserById(dto.userId)
        }

        let post
        if (fileName) {
            post = await this.postRepository.create({...dto, image: fileName})
        } else {
            post = await this.postRepository.create({...dto})
        }

        await post.setAuthor(author)

        return post
    }

    async getPosts() {
        const posts = await this.postRepository.findAll()
        return posts
    }
}
