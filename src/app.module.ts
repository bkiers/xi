import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEntity } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { GameEntity } from './game/game.entity';
import { MoveEntity } from './game/move.entity';
import { GameModule } from './game/game.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: './data/xi-dev.db',
      logging: console.log,
      autoLoadModels: true,
      models: [UserEntity, MoveEntity, GameEntity],
    }),
    UserModule,
    AuthModule,
    GameModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
