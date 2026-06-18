import {Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodDeed } from './good-deed.entity';
import { GoodDeedsService } from './good-deeds.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([GoodDeed])
    ],
    providers: [GoodDeedsService],
    exports: [GoodDeedsService],
})
export class GoodDeedModule {}