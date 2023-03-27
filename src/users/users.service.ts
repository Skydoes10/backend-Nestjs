import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Status, User } from './entities/user.entity';

@Injectable()
export class UsersService {
	constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

	async createUser(newUser: CreateUserDto): Promise<User | Error> {
		const { email, usertag } = newUser;
		try {
			const existsByEmail = await this.usersRepository.findOne({ where: { email } });
			const existsByTag = await this.usersRepository.findOne({ where: { usertag } });

			// Check if email or usertag already exists
			if (existsByEmail) {
				return new HttpException('Email already exists', 400);
			} else if (existsByTag) {
				return new HttpException('Usertag already exists', 400);
			}

			// Create user
			const user = this.usersRepository.create(newUser);

			// Hash password
			const salt = await bcrypt.genSalt();
			user.password = await bcrypt.hash(user.password, salt);

			// Save user
			return await this.usersRepository.save(user);
		} catch (error) {
			console.error(error);
			return error;
		}
	}

	async getAllUsers(): Promise<User[]> {
		try {
			return await this.usersRepository.find({
				where: { status: Status.ACTIVE },
			});
		} catch (error) {
			console.error(error);
			return error;
		}
	}

	async getUserById(id: string): Promise<User | Error> {
		try {
			const user = await this.usersRepository.findOne({
				where: { id, status: Status.ACTIVE },
				relations: ['posts'],
			});

			if (!user) {
				return new HttpException('User not found', 404);
			}

			return user;
		} catch (error) {
			console.error(error);
			return error;
		}
	}

	async getUserByEmail(email: string): Promise<User> {
		try {
			const user = await this.usersRepository.findOne({
				where: { email, status: Status.ACTIVE },
				relations: ['posts'],
			});

			return user;
		} catch (error) {
			console.error(error);
			return error;
		}
	}

	async updateUser(id: string, updatedUser: UpdateUserDto) {
		const { password } = updatedUser;
		try {
			if (password) {
				// Hash password
				const salt = await bcrypt.genSalt();
				updatedUser.password = await bcrypt.hash(password, salt);
			}

			const result = await this.usersRepository.update({ id }, updatedUser);

			if (result.affected === 0) {
				return new HttpException('User not found', 404);
			}

			return result;
		} catch (error) {
			console.error(error);
			return error;
		}
	}
}
