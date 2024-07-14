import { Module } from '@nestjs/common';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Likes } from './entities/likes.entity';
import { Articles } from 'src/articles/entities/articles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Likes, Articles])],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
