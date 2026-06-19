import { Controller, Post, Body, Req, UseGuards, Get, Param, Delete} from '@nestjs/common';
import { GoodDeedsService } from "./good-deeds.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateGoodDeedDto } from "./dto/create-good-deed.dto";

@Controller('good-deeds')
export class GoodDeedsController {
    constructor (
        private readonly goodDeedsService : GoodDeedsService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body() dto: CreateGoodDeedDto,
        @Req() req,
    ) {
        return this.goodDeedsService.createGoodDeed(
            dto.title,
            dto.description,
            req.user.userId,
        )
    }

    @UseGuards(JwtAuthGuard)
    @Get('my')
    async getMyGoodDeeds(
        @Req() req,
    ) {
        return this.goodDeedsService.getMyGoodDeeds(
            req.user.userId,
        )
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getById(
        @Param('id') id: string,
    ) {
        return this.goodDeedsService.getGoodDeedById(
            Number(id),
        );
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(
        @Param('id') id : string,
        @Req() req,
    ) {
        await this.goodDeedsService.deleteGoodDeed(
            Number(id),
            req.user.userId,
        )

        return {
            message: 'Good deed deleted',
        };
    }
}