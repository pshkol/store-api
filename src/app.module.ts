import {Inject, Module} from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import {ConfigModule, ConfigType} from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import config from '../config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_SYNCHRONIZE: Joi.boolean().required(),
        POSTGRES_AUTO_LOAD_ENTITIES: Joi.boolean().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
    ProductsModule,
    OrdersModule,
  ],
})
export class AppModule {
  static port: number;
  constructor(@Inject(config.KEY) configService: ConfigType<typeof config>) {
    AppModule.port = configService.port;
  }
}
