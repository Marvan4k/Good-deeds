import { Injectable, NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GoodDeed } from './good-deed.entity';

@Injectable()
export class GoodDeedsService {
    constructor (
        @InjectRepository(GoodDeed)
        private readonly goodDeedRepository: Repository<GoodDeed>,
    ) {}

    async createGoodDeed(
        title: string,
        description: string,
        userId: number
    ) : Promise <GoodDeed> {
        const goodDeed = this.goodDeedRepository.create({
            title,
            description,
            user: {
                id: userId,
            }
        });
        
        return await this.goodDeedRepository.save(goodDeed)
    }

    async getMyGoodDeeds(userId: number): Promise <GoodDeed[]> {
        return this.goodDeedRepository.find({
            where: {
                user: {
                    id: userId,
                }
            }
        })
    }

    async getGoodDeedById(
        id: number
    ): Promise <GoodDeed> {
        const goodDeed = await this.goodDeedRepository.findOne({
            where: { id },
            relations: {user : true},
        })

        if (!goodDeed) {
            throw new NotFoundException('Good deed not found');
        }
        
        return goodDeed;
    }
}