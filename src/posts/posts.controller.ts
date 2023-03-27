import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { Post as PostEntity } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    createPost(@Request() req, @Body() newPost: CreatePostDto): Promise<PostEntity> {
        newPost.authorId = req.user.id;
        return this.postsService.createPost(newPost);
    }

    @Get()
    getAllPosts(): Promise<PostEntity[]> {
        return this.postsService.getAllPosts();
    }

    @Get(':id')
    getPostById(@Param('id') id: string): Promise<PostEntity> {
        return this.postsService.getPostById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deletePost(@Param('id') id: string) {
        return this.postsService.deletePost(id);
    }
}
