import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { UsersService } from 'src/users/users.service';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.getUserByEmail(email);

        if (user) {
            const isMatch = await bcrypt.compare(pass, user.password);

            if (isMatch) {
                const { password, ...result } = user;
                return result;
            }
            return null;
        }
    }

    async login(user: User) {
        const payload = { username: user.username, usertag: user.usertag, sub: user.id };
        return {
            user,
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(user: CreateUserDto) {
        const newUser = await this.usersService.createUser(user);

        if (newUser instanceof Error) {
            return newUser;
        }

        const payload = { username: newUser.username, usertag: newUser.usertag, sub: newUser.id };
        return {
            user: newUser,
            access_token: this.jwtService.sign(payload),
        };
    }

    async checkAuth(user: User) {
        const { id, username, usertag } = user;
        const userFound = await this.usersService.getUserById(id);

        if (!userFound) {
            return null;
        }

        const payload = { username, usertag, sub: id };
        return {
            user: userFound,
            access_token: this.jwtService.sign(payload),
        };
    }

}
