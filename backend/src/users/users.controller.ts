import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";

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

    @UseGuards(JwtAuthGuard)
    @Patch('me')
    async updateMe(
        @Body() dto: UpdateUserDto,
        @Req() req,
    ) {
        return this.usersServise.updateUser(
            req.user.userId,
            dto,
        );
    }

    @UseGuards(JwtAuthGuard)
    @Delete('me')
    async deleteMe(
        @Req() req,
    ) {
        await this.usersServise.deleteUser(
            req.user.userId,
        );

        return {
            message: 'User deleted',
        };
    }

    @UseGuards(JwtAuthGuard)
    @Patch('me/password')
    async changePassword(
        @Body() dto: ChangePasswordDto,
        @Req() req,
    ) {
        return this.usersServise.changePassword(
            req.user.userId,
            dto,
        );
    }
}