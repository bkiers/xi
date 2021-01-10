import { MailTemplate } from './mail.template';
import { GameEntity } from '../../game/game.entity';
import { humanReadable } from '../../util/string.utils';

export class NewGameTemplate extends MailTemplate {
  constructor(readonly game: GameEntity) {
    super(
      'new_game',
      [game.invitedPlayer.email],
      'Xi - New challenge!',
      game,
      ['timePerMove', humanReadable(game.secondsPerMove)],
      ['color', game.invitedPlayerId === game.redPlayerId ? 'red' : 'black'],
    );
  }
}
