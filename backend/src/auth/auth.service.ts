import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}
    
    async register(dto: RegisterDto) {
        const existingUser = await this.usersService.findByEmail(dto.email);

        if(existingUser){
            return {
                message: 'User already exists'
            }
        }

        const hash = await bcrypt.hash(dto.password, 10)

        const user = await this.usersService.createUser(
            dto.email,
            hash,   
        );
        return { 
            message: 'User can be created',
            user: {
                id: user.id,
                email: user.email,
            },
        };
    }
}