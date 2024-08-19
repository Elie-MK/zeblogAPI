import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteArticleController } from './favorite-article.controller';

describe('FavoriteArticleController', () => {
  let controller: FavoriteArticleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoriteArticleController],
    }).compile();

    controller = module.get<FavoriteArticleController>(
      FavoriteArticleController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
