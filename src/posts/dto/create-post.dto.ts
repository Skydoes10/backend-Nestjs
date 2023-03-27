import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePostDto {
    @IsString()
    @IsOptional()
    authorId?: string;

    @IsString()
    @IsNotEmpty()
    text: string;

    @IsString({ each: true })
    @IsOptional()
    imagesURL?: string[];
}
