import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async createUser(username: string, email: string, passwordHash: string): Promise<User> {
        const user = this.usersRepository.create({username, email, passwordHash });  
        
        return await this.usersRepository.save(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.usersRepository.findOne({ 
            where: { email }
        });
    }

    async findByUsername(username: string): Promise<User | null> {
        return this.usersRepository.findOne({
            where: {
                username,
            }
        })
    }

    async findByIdWithFriends(userId: number): Promise<User | null> {
        return this.usersRepository.findOne({
            where: {
                id: userId,
            },
            relations: {
                friends: true,
            },
        })
    }
    
    async addFriend(userId: number, friendUsername: string) : Promise <User>{
        const user = await this.findByIdWithFriends(userId);

        if (!user) {
            throw new NotFoundException(
                'User not found',
            );
        }

        const friend = await this.findByUsername(friendUsername);

        if(!friend){
            throw new NotFoundException(
                'Friend not found',
            );
        }

        if (user.id === friend.id) {
            throw new BadRequestException(
                'You cannot add yourself',
            );
        }

        const alreadyFriend = user.friends.some(
            (f) => f.id === friend.id,
        );

        if (alreadyFriend) {
            throw new BadRequestException(
                'User is already your friend',
            );
        }

        user.friends.push(friend);

        await this.usersRepository.save(user);

        return this.findByIdWithFriends(userId) as Promise<User>;
    }

    async getFriends(userId: number): Promise<User[]> {
        const user = await this.findByIdWithFriends(userId);

        if(!user){
            throw new NotFoundException(
                'User not found',
            );
        }
        
        return user.friends;
    }

    async removeFriend(userId: number, friendUsername: string) : Promise <User[]> {
        const user = await this.findByIdWithFriends(userId);
        
        if (!user) {
            throw new NotFoundException(
                'User not found',
            );
        }

        const friend = await this.findByUsername(friendUsername);

        if (!friend) {
            throw new NotFoundException(
                'Friend not found',
            );
        }

        user.friends = user.friends.filter(
            (f) => f.id !== friend.id
        )

        await this.usersRepository.save(user);

        return user.friends;
    }

    async findByUsernameWithGoodDeeds(username:string) : Promise <User | null> {
        return this.usersRepository.findOne({
            where: {
                username,
            },
            relations: {
                goodDeeds: true,
            }
        })
    }

    async getUserGoodDeeds(username: string) {
        const user = await this.findByUsernameWithGoodDeeds(username);

        if(!user){
            throw new NotFoundException(
                'User not found',
            );
        }

        return user.goodDeeds;
    }

    async findById(id: number): Promise <User | null> {
        return this.usersRepository.findOne({
            where: {
                id,
            }
        })
    }

    async updateUser(userId: number,dto: UpdateUserDto): Promise<User> {
        const user = await this.findById(userId);

        if(!user) {
            throw new NotFoundException(
                'User not found',
            );
        }
        
        Object.assign(user, dto);

        return await this.usersRepository.save(
            user,
        )
    }

    async deleteUser(userId: number): Promise<void> {
        const user = await this.findById(userId);

        if(!user) {
            throw new NotFoundException(
                'User not found',
            );
        }

        await this.usersRepository.remove(
            user,
        )
    }
}

