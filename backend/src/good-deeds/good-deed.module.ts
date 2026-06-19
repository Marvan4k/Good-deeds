import {Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodDeed } from './good-deed.entity';
import { GoodDeedsService } from './good-deeds.service';
import { GoodDeedsController } from './good-deeds.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([GoodDeed])
    ],
    controllers: [GoodDeedsController],
    providers: [GoodDeedsService],
    exports: [GoodDeedsService],
})
export class GoodDeedModule {}