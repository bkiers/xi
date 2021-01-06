import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { GameEntity } from './game.entity';
import { MoveEntity } from './move.entity';
import { GameService } from './game.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, SequelizeModule.forFeature([MoveEntity, GameEntity])],
  controllers: [GameController],
  providers: [GameService],
  exports: [GameService],
})
export class GameModule {}
