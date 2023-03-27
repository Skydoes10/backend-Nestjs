import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post) private postsRepository: Repository<Post>,
        private usersService: UsersService
    ) { }

    async createPost(post: CreatePostDto): Promise<Post> {
        const { authorId } = post;
        try {
            const user = await this.usersService.getUserById(authorId);

            if (!user) {
                throw new HttpException('User not found', 404);
            }

            const newPost = this.postsRepository.create(post);
            await this.postsRepository.save(newPost);

            const postCreated = await this.postsRepository.findOne({
                where: { id: newPost.id },
                relations: ['author']
            });

            return postCreated;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async getAllPosts(): Promise<Post[]> {
        try {
            return await this.postsRepository.find({
                relations: ['author']
            });
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async getPostById(id: string): Promise<Post> {
        try {
            return await this.postsRepository.findOne({
                where: { id },
                relations: ['author']
            });
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async deletePost(id: string) {
        try {
            const response = await this.postsRepository.delete(id);

            if (response.affected === 0) {
                throw new HttpException('Post not found', 404);
            }

            return {
                message: 'Post deleted',
                postDeleted: id,
            };
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}
