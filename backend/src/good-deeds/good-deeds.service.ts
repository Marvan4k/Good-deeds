import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GoodDeed } from './good-deed.entity';

@Injectable()
export class GoodDeedsService {
    constructor (
        @InjectRepository(GoodDeed)
        private readonly goodDeedRepository: Repository<GoodDeed>,
    ) {}
}