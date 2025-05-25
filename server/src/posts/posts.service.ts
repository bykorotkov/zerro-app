import {Injectable} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Post} from "./posts.model";
import {FilesService} from "../files/files.service";
import {UsersService} from "../users/users.service";
import {User} from "../users/users.model";

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

        const author = await this.userService.getUserById(dto.userId);
        if (!author) {
            throw new Error('Пользователь не найден');
        }

        const postData: any = {
            title: dto.title,
            content: dto.content,
            userId: dto.userId,
        };

        if (fileName) {
            postData.image = fileName;
        }

        const post = await this.postRepository.create(postData);

        return await this.postRepository.findByPk(post.id, {
            include: [{model: User, as: 'author'}],
        })
    }

    async getPosts() {
        return this.postRepository.findAll({
            include: [
                {
                    model: User,
                    as: 'author',
                    attributes: [`id`, `banned`, `banReason`, `createdAt`, `email`, `phone`, `updatedAt`, `username`]
                }
            ],
        });
    }

    async findOnePost(id: number): Promise<Post> {
        return this.postRepository.findOne({
            where: { id },
            include: [
                {
                    model: User,
                    as: 'author',
                    attributes: [`id`, `banned`, `banReason`, `createdAt`, `email`, `phone`, `updatedAt`, `username`]
                }
            ]
        })
    }
}
