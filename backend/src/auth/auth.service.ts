import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService, 
    ) {}
    
    async register(dto: RegisterDto) {
        const existingUser = await this.usersService.findByEmail(dto.email);

        if(existingUser){
            throw new BadRequestException(
                'User already exists',
            );
        }

        const hash = await bcrypt.hash(dto.password, 10)

        const user = await this.usersService.createUser(
            dto.username,
            dto.email,
            hash,   
        );
        return this.generateToken(
            user.id,
            user.email,
            user.username
        );
    }

    async login(dto: LoginDto){
        const user = await this.usersService.findByEmail(dto.email);

        if(!user){
            throw new UnauthorizedException("Invalid email");
        }

        const passwordValid = await bcrypt.compare(
            dto.password,
            user.passwordHash,
        )

        if(!passwordValid){
             throw new UnauthorizedException('Invalid password');        
        }

        return this.generateToken(
            user.id,
            user.email,
            user.username
        )
    }

    async getMe(userId: number) {
        const user = await this.usersService.findById(userId,);

        if (!user) {
            throw new NotFoundException(
                'User not found',
            );
        }

        return {
            id: user.id,
            email: user.email,
            username: user.username,
        };
    }
    
    

    private generateToken(userId : number, email : string, username: string){
        return {
            access_token: this.jwtService.sign({
                sub: userId,
                email,
                username,
            }),
        }
    }
}