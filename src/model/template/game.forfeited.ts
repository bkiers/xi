import { MailTemplate } from './mail.template';
import { GameEntity } from '../../game/game.entity';

export class GameForfeited extends MailTemplate {
  constructor(readonly game: GameEntity) {
    super('game_forfeited', [game.winnerPlayer.email], 'Xi - You won!', game);
  }
}
