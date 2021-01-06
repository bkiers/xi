import { OnEvent } from '@nestjs/event-emitter';
import { GameEntity } from '../game/game.entity';

export class EmailService {
  @OnEvent('game.created', { async: true })
  private handleGameCreatedEvent(game: GameEntity) {
    console.log('>>> TODO: handle `game.created` for game id', game.id);
  }
}
