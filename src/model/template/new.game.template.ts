import { MailTemplate } from './mail.template';
import { GameEntity } from '../../game/game.entity';

export class NewGameTemplate extends MailTemplate {
  constructor(readonly game: GameEntity) {
    super('new_game', game.invitedPlayer.email, 'Xi - New challenge!', game);
  }
}
