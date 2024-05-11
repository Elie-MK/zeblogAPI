import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Likes } from './entities/likes.entity';
import { Repository } from 'typeorm';
import { likeDto } from './dtos/likeDto';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Likes)
    private readonly likesRepository: Repository<Likes>,
  ) {}

  async createLike(idArticles: number, idUser: number, LikeDto: likeDto) {
    const newLike = this.likesRepository.create({
      idArticles,
      idUser,
      likeStatus: LikeDto.likeStatus,
    });
    await this.likesRepository.save(newLike);
    return newLike;
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

  deleteLikeByUser(idArticles: number, idUser: number) {
    return this.likesRepository.delete({ idArticles, idUser });
  }
}
