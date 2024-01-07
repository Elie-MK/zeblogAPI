import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from './entities/comments.entities';
import { Articles } from 'src/articles/entities/articles.entities';

@Module({
  imports:[TypeOrmModule.forFeature([Comments, Articles])],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
