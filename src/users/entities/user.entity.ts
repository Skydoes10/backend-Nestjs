import { Column, PrimaryGeneratedColumn, OneToMany, Entity, CreateDateColumn, AfterLoad, JoinColumn } from "typeorm";
import { Post } from '../../posts/entities/post.entity';

export enum Status {
    ACTIVE = 'ACTIVE', DELETED = 'DELETED', BANNED = 'BANNED'
}

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    username: string;

    @Column({ unique: true })
    usertag: string;

    @Column({ default: './assets/default-profile-picture.png', })
    imageURL: string;

    @OneToMany(() => Post, post => post.author)
    posts: Post[];

    @Column({ default: Status.ACTIVE })
    status: Status;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
}
