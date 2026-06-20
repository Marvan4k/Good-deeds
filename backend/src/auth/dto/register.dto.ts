import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class RegisterDto {
    @IsEmail({}, {message: "Not correct email"})
    email!: string

    @IsString()
    @MinLength(6, {message: "The password must be at least 6 characters long."})
    password!: string

    @IsString()
    @MinLength(3)
    @MaxLength(32)
    @Matches(/^[a-zA-Z0-9_]+$/, {
        message:
            'Username can contain only letters, numbers and underscore',
    })
    username!: string;  
}