import { Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller('users')
export class UsersController {
    constructor(private readonly usersServise: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Post('friends/:username')
    async addFrined(
        @Param('username') username: string,
        @Req() req,
    ) {
        return this.usersServise.addFriend(
            req.user.userId,
            username,
        )
    }

    @UseGuards(JwtAuthGuard)
    @Get('friends')
    async getFriends(
        @Req() req,
    ) {
        return this.usersServise.getFriends(
            req.user.userId,
        )
    }

    @UseGuards(JwtAuthGuard)
    @Delete('friends/:username')
    async removeFriend(
        @Param('username') username: string,
        @Req() req,    
    ) {
        return this.usersServise.removeFriend(
            req.user.userId,
            username,
        )
    }

    @UseGuards(JwtAuthGuard)
    @Get(':username/good-deeds')
    async getUserGoodDeeds(
        @Param('username') username: string,
    ) {
        return this.usersServise.getUserGoodDeeds(
            username,
        );
    }
}