import { MailTemplate } from './mail.template';
import { GameEntity } from '../../game/game.entity';

export class GameOverTemplate extends MailTemplate {
  constructor(readonly game: GameEntity) {
    super(
      'game_over',
      [game.redPlayer.email, game.blackPlayer.email],
      'Xi - Game over!',
      game,
    );
  }
}
