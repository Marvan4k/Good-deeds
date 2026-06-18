import { IsEmail, IsString, MinLength } from "class-validator"

export class RegisterDto {
    @IsEmail({}, {message: "Not correct email"})
    email!: string

    @IsString()
    @MinLength(6, {message: "The password must be at least 6 characters long."})
    password!: string
}