import { MailTemplate } from './mail.template';
import { GameEntity } from '../../game/game.entity';

export class AcceptedGameTemplate extends MailTemplate {
  constructor(readonly game: GameEntity) {
    super(
      'accepted_game',
      game.initiatedPlayer.email,
      'Xi - Game accepted!',
      game,
    );
  }
}
