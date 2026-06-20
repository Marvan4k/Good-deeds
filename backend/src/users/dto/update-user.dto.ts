import { IsEmail, IsOptional, IsString, Matches, MinLength } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    @Matches(/^[a-zA-Z0-9_]+$/)
    username?: string;
}