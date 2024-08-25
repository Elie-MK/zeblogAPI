import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: configService.get<string>('POSTGRES_URL'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: ['dist/src/db/migrations/*.js'],
  synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
  logging: configService.get<boolean>('DB_LOGGING'),
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
