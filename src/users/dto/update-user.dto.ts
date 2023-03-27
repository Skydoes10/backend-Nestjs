import { IsString, MinLength, IsOptional, IsIn } from 'class-validator';
import { Status } from '../entities/user.entity';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    @MinLength(3)
    @IsOptional()
    username?: string;

    @IsString()
    @MinLength(3)
    @IsOptional()
    password?: string;

    @IsString()
    @IsOptional()
    imageURL?: string;

    @IsString()
    @IsOptional()
    @IsIn([Status.ACTIVE, Status.DELETED, Status.BANNED])
    status?: Status;
}
