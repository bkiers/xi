import { OnEvent } from '@nestjs/event-emitter';
import { GameEntity } from '../game/game.entity';
import { EmailClient } from '../email/email.client';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailEventBus {
  private readonly logger = new Logger(EmailEventBus.name);

  constructor(private readonly emailClient: EmailClient) {}

  @OnEvent('game.created', { async: true })
  private handleGameCreatedEvent(game: GameEntity) {
    const t = this.emailClient.sendTemplate('new_game', game);
    console.log(t);
  }
}
