import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FilmModule } from './film/film.module';
import { CategoryModule } from './category/category.module';
import { ClassificationModule } from './classification/classification.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Classification } from './classification/entities/classification.entity';
import { Film } from './film/entities/film.entity';
import { Category } from './category/entities/category.entity';
import { ValidateHeadersMiddleware } from './common/middleware/validate-header-middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'mks_backend_challenge',
      password: '235704',
      database: 'mks_backend_challenge',
      entities: [User, Classification, Film, Category],
      migrations: ['migrations/*.js'],
      synchronize: true,
    }),
    UserModule,
    FilmModule,
    CategoryModule,
    ClassificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateHeadersMiddleware)
      .exclude({ path: 'user', method: RequestMethod.POST })
      .forRoutes('*');
  }
}
