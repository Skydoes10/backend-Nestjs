import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Post } from './posts/entities/post.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [ConfigModule.forRoot({
		envFilePath: '.env.development',
	}),
	TypeOrmModule.forRoot({
		type: 'postgres',
		host: process.env.HOST_DB,
		port: parseInt(process.env.PORT_DB) || 5432,
		username: process.env.USER_DB,
		password: process.env.PASSWORD_DB,
		database: process.env.DATABASE,
		synchronize: true,
		entities: [User, Post],
	}),
		PostsModule,
		UsersModule,
		AuthModule],
	controllers: [],
	providers: [],
})
export class AppModule { }
