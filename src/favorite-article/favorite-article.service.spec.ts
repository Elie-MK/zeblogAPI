import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteArticleService } from './favorite-article.service';

describe('FavoriteArticleService', () => {
  let service: FavoriteArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoriteArticleService],
    }).compile();

    service = module.get<FavoriteArticleService>(FavoriteArticleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
