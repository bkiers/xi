import { MailTemplate } from './mail.template';
import { GameEntity } from '../../game/game.entity';

export class MoveNotificationTemplate extends MailTemplate {
  constructor(readonly game: GameEntity) {
    super(
      'move_notification',
      [game.turnPlayer.email],
      'Xi - Your move!',
      game,
      [
        'otherPlayerName',
        game.turnPlayerId === game.redPlayerId
          ? game.blackPlayer.name
          : game.redPlayer.name,
      ],
    );
  }
}
