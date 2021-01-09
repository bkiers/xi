import { OnEvent } from '@nestjs/event-emitter';
import { GameEntity } from '../game/game.entity';
import { EmailClient } from '../email/email.client';
import { Injectable, Logger } from '@nestjs/common';
import { NewGameTemplate } from '../model/template/new.game.template';
import { AcceptedGameTemplate } from '../model/template/accepted.game.template';

@Injectable()
export class EmailEventBus {
  private readonly logger = new Logger(EmailEventBus.name);

  constructor(private readonly emailClient: EmailClient) {}

  @OnEvent('game.created', { async: true })
  private async handleGameCreatedEvent(game: GameEntity) {
    try {
      await this.emailClient.sendTemplate(new NewGameTemplate(game));
    } catch (e) {
      this.logger.error(`Could not send 'new_game' email: ${e}`);
    }
  }

  @OnEvent('game.accepted', { async: true })
  private async handleGameAcceptedEvent(game: GameEntity) {
    try {
      await this.emailClient.sendTemplate(new AcceptedGameTemplate(game));
    } catch (e) {
      this.logger.error(`Could not send 'accepted_game' email: ${e}`);
    }
  }
}
