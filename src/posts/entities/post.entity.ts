import { PrimaryGeneratedColumn, Column, ManyToOne, Entity, CreateDateColumn, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'posts' })
export class Post {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    authorId: string;

    @ManyToOne(() => User, user => user.posts)
    author: User;

    @Column()
    text: string;

    @Column({ type: 'simple-array' })
    imagesURL: string[] = [];

    @Column({ default: 0 })
    likes: number;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
}

