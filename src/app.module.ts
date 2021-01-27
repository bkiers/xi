import {
  HttpModule,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEntity } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { GameEntity } from './game/game.entity';
import { MoveEntity } from './game/move.entity';
import { GameModule } from './game/game.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventModule } from './event/event.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from './task/task.module';
import { LoginCheckMiddleware } from './middleware/login.check.middleware';
import { EmailModule } from './email/email.module';
import { ResetPasswordEntity } from './auth/reset.password.entity';
import { NotificationEntity } from './entity/notification.entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: process.env.XI_DB_STORAGE,
      logging: process.env.XI_DB_LOGGING === 'true' ? console.log : null,
      autoLoadModels: true,
      models: [
        UserEntity,
        MoveEntity,
        GameEntity,
        ResetPasswordEntity,
        NotificationEntity,
      ],
    }),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    EmailModule,
    HttpModule,
    UserModule,
    AuthModule,
    GameModule,
    EventModule,
    TaskModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoginCheckMiddleware)
      .exclude(
        { path: '/login', method: RequestMethod.GET },
        { path: '/login', method: RequestMethod.POST },
        { path: '/request-reset-password', method: RequestMethod.GET },
        { path: '/request-reset-password', method: RequestMethod.POST },
        { path: '/reset-password/:code', method: RequestMethod.GET },
        { path: '/reset-password', method: RequestMethod.POST },
      )
      .forRoutes(AppController);
  }
}
