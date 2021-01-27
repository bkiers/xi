import { MailTemplate } from './mail.template';
import { GameEntity } from '../../game/game.entity';

export class ClockRanOut extends MailTemplate {
  constructor(readonly game: GameEntity) {
    super(
      'clock_ran_out',
      [game.redPlayer.email, game.blackPlayer.email],
      "Xi - Time's up!",
      game,
    );
  }
}
