import { OnEvent } from '@nestjs/event-emitter';
import { GameEntity } from '../game/game.entity';
import { EmailClient } from '../email/email.client';
import { Injectable, Logger } from '@nestjs/common';
import { NewGameTemplate } from '../model/template/new.game.template';
import { AcceptedGameTemplate } from '../model/template/accepted.game.template';
import { MoveNotificationTemplate } from '../model/template/move.notification.template';
import { ResetPasswordEntity } from '../auth/reset.password.entity';
import { ResetPasswordTemplate } from '../model/template/reset.password.template';
import { GameOverTemplate } from '../model/template/game.over.template';

@Injectable()
export class EmailEventBus {
  private readonly logger = new Logger(EmailEventBus.name);

  constructor(private readonly emailClient: EmailClient) {}

  @OnEvent('game.created', { async: true })
  private async handleGameCreatedEvent(game: GameEntity) {
    try {
      await this.emailClient.sendTemplate(new NewGameTemplate(game));
    } catch (e) {
      this.logger.error(`Could not send email for event 'game.created': ${e}`);
    }
  }

  @OnEvent('game.accepted', { async: true })
  private async handleGameAcceptedEvent(game: GameEntity) {
    try {
      await this.emailClient.sendTemplate(new AcceptedGameTemplate(game));
      await this.emailClient.sendTemplate(new MoveNotificationTemplate(game));
    } catch (e) {
      this.logger.error(`Could not send email for event 'game.accepted': ${e}`);
    }
  }

  @OnEvent('move.created', { async: true })
  private async handleGameMoveEvent(game: GameEntity) {
    try {
      await this.emailClient.sendTemplate(new MoveNotificationTemplate(game));
    } catch (e) {
      this.logger.error(`Could not send email for event 'move.created': ${e}`);
    }
  }

  @OnEvent('reset.password.created', { async: true })
  private async handleResetEvent(entity: ResetPasswordEntity) {
    try {
      await this.emailClient.sendTemplate(new ResetPasswordTemplate(entity));
    } catch (e) {
      this.logger.error(
        `Could not send email for event 'reset.password.created': ${e}`,
      );
    }
  }

  @OnEvent('game.over', { async: true })
  private async handleGameOverEvent(game: GameEntity) {
    try {
      await this.emailClient.sendTemplate(new GameOverTemplate(game));
    } catch (e) {
      this.logger.error(`Could not send email for event 'game.over': ${e}`);
    }
  }
}
