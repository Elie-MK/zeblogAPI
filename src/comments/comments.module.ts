import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from './entities/comments.entity';
import { Articles } from 'src/articles/entities/articles.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Comments, Articles])],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
