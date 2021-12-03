import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../../config';
import { ConfigType } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          type: 'postgres',
          username: configService.postgres.user,
          password: configService.postgres.password,
          database: configService.postgres.db,
          port: configService.postgres.port,
          synchronize: configService.postgres.synchronize,
          autoLoadEntities: configService.postgres.autoLoadEntities,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
