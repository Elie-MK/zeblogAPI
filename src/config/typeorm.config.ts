import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export default class typeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: configService.get<string>('POSTGRES_URL'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
    };
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => typeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService],
};
