import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) { }

	@Post()
	createUser(@Body() createUserDto: CreateUserDto): Promise<User | Error> {
		return this.usersService.createUser(createUserDto);
	}

	@Get()
	getAllUsers(): Promise<User[]> {
		return this.usersService.getAllUsers();
	}

	@Get(':id')
	getUserById(@Param('id') id: string): Promise<User | Error> {
		return this.usersService.getUserById(id);
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	updateUser(@Param('id') id: string, @Body() updatedUser: UpdateUserDto) {
		return this.usersService.updateUser(id, updatedUser);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	deleteUser(@Param('id') id: string, @Body() updatedUser: UpdateUserDto) {
		return this.usersService.updateUser(id, updatedUser);
	}
}
