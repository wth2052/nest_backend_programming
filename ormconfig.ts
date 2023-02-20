import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: '172.18.131.137',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'test',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  migrations: [__dirname + '/**/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
});
