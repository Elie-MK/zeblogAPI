import { Body, Controller, Param, ParseIntPipe, Post, Put, Request, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { likeDto } from './dtos/likeDto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Likes')
@Controller('like')
export class LikesController {
    constructor(private readonly likesService: LikesService) {}

    @UseGuards(AuthGuard)
    @Post('createLike/:idArticles')
    async createLike(@Param('idArticles', ParseIntPipe) idArticles: number, @Request() req, @Body() LikeDto:likeDto) {
        try {
            return await this.likesService.createLike(idArticles, req.user, LikeDto);
        } catch (error) {
            console.log(error.message);
        }
    }

    @UseGuards(AuthGuard)
    @Put('changeLike/:idArticles')
    async changeLike(@Param('idArticles', ParseIntPipe) idArticles: number, @Request() req, @Body() LikeDto:likeDto) {
        try {
            return await this.likesService.modifyLike(idArticles, req.user, LikeDto);
        } catch (error) {
            console.log(error.message);
        }
    }
}
