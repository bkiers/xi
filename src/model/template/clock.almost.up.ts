import { MailTemplate } from './mail.template';
import { GameEntity } from '../../game/game.entity';

export class ClockAlmostUp extends MailTemplate {
  constructor(readonly game: GameEntity) {
    super(
      'clock_almost_up',
      [game.turnPlayer.email],
      'Xi - The clock is ticking...',
      game,
    );
  }
}
