import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEntity } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { GameEntity } from './game/game.entity';
import { MoveEntity } from './game/move.entity';
import { GameModule } from './game/game.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EmailModule } from './email/email.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: './data/xi-dev.db',
      logging: console.log,
      autoLoadModels: true,
      models: [UserEntity, MoveEntity, GameEntity],
    }),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    UserModule,
    AuthModule,
    GameModule,
    EmailModule,
    TaskModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
