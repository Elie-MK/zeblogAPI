import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Likes } from './entities/likes.entity';
import { Repository } from 'typeorm';
import { likeDto } from './dtos/likeDto';
import { Articles } from 'src/articles/entities/articles.entity';
import { IRequestUser } from 'src/shared/IRequestUser';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Likes)
    private readonly likesRepository: Repository<Likes>,
    @InjectRepository(Articles)
    private readonly articlesRepository: Repository<Articles>,
  ) {}
  log = new Logger();

  async addLike(idArticle: number, user: IRequestUser, LikeDto: likeDto) {
    this.log.debug('current user id ', user);
    try {
      const article = await this.articlesRepository.findOne({
        where: { idArticles: idArticle },
        relations: ['likes'],
      });
      if (article) {
        this.log.debug('Article likes:', article.likes);

        const existingLike = article.likes.find(
          (like) => like.idUser === user.idUser,
        );

        if (existingLike) {
          this.log.debug('Existing like found:', existingLike);
          await this.likesRepository.remove(existingLike);
          this.log.debug('Existing like removed');
        } else {
          const like = this.likesRepository.create({
            idArticles: idArticle,
            idUser: user.idUser,
            likeStatus: LikeDto.likeStatus,
          });
          this.log.debug('article liked', like);
          return await this.likesRepository.save(like);
        }
      }
    } catch (error) {
      this.log.debug('Error adding like', error);
      throw new Error('Unable to add like');
    }
  }

  modifyLike(idArticles: number, idUser: number, LikeDto: likeDto) {
    return this.likesRepository.update(
      { idArticles, idUser },
      { likeStatus: LikeDto.likeStatus },
    );
  }

  getAllLikes(): Promise<Likes[]> {
    return this.likesRepository.find();
  }

  async getLikesByArticle(idArticles: number): Promise<Likes[]> {
    return await this.likesRepository.find({ where: { idArticles } });
  }

  async getLikesByUser(idUser: number): Promise<Likes[]> {
    return await this.likesRepository.find({ where: { idUser } });
  }

  deleteLikeByUser(idArticles: number, user: IRequestUser) {
    return this.likesRepository.delete({ idArticles, idUser: user.idUser });
  }
}
