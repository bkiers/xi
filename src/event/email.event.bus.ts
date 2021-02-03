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
import { ClockAlmostUp } from '../model/template/clock.almost.up';
import { ClockRanOut } from '../model/template/clock.ran.out';
import { DrawProposalEntity } from '../game/draw.proposal.entity';
import { ProposeDraw } from '../model/template/propose.draw';
import { DrawProposalAnswer } from '../model/template/draw.proposal.answer';

@Injectable()
export class EmailEventBus {
  private readonly logger = new Logger(EmailEventBus.name);

  constructor(private readonly emailClient: EmailClient) {}

  @OnEvent('game.created', { async: true })
  private async handleGameCreatedEvent(game: GameEntity) {
    try {
      this.logger.log(
        `GAME[${game.id}] :: Going to send an email for 'game.created'`,
      );

      await this.emailClient.sendTemplate(new NewGameTemplate(game));
    } catch (e) {
      this.logger.error(`Could not send email for event 'game.created': ${e}`);
    }
  }

  @OnEvent('game.accepted', { async: true })
  private async handleGameAcceptedEvent(game: GameEntity) {
    try {
      this.logger.log(
        `GAME[${game.id}] :: Going to send an email for 'game.accepted'`,
      );

      await this.emailClient.sendTemplate(new AcceptedGameTemplate(game));
      await this.emailClient.sendTemplate(new MoveNotificationTemplate(game));
    } catch (e) {
      this.logger.error(`Could not send email for event 'game.accepted': ${e}`);
    }
  }

  @OnEvent('move.created', { async: true })
  private async handleGameMoveEvent(game: GameEntity) {
    try {
      this.logger.log(
        `GAME[${game.id}] :: Going to send an email for 'move.created'`,
      );

      await this.emailClient.sendTemplate(new MoveNotificationTemplate(game));
    } catch (e) {
      this.logger.error(`Could not send email for event 'move.created': ${e}`);
    }
  }

  @OnEvent('reset.password.created', { async: true })
  private async handleResetEvent(entity: ResetPasswordEntity) {
    try {
      this.logger.log(`Going to send an email for 'reset.password.created'`);

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
      this.logger.log(
        `GAME[${game.id}] :: going to send an email for 'game.over'`,
      );

      await this.emailClient.sendTemplate(new GameOverTemplate(game));
    } catch (e) {
      this.logger.error(`Could not send email for event 'game.over': ${e}`);
    }
  }

  @OnEvent('clock.ran.out', { async: true })
  private async handleClockRanOutEvent(game: GameEntity) {
    try {
      this.logger.log(
        `GAME[${game.id}] :: Going to send an email for 'clock.ran.out'`,
      );

      await this.emailClient.sendTemplate(new ClockRanOut(game));
    } catch (e) {
      this.logger.error(`Could not send email for event 'clock.ran.out': ${e}`);
    }
  }

  @OnEvent('clock.almost.up', { async: true })
  private async handleClockAlmostUpEvent(game: GameEntity) {
    try {
      this.logger.log(
        `GAME[${game.id}] :: Going to send an email for 'clock.almost.up'`,
      );

      await this.emailClient.sendTemplate(new ClockAlmostUp(game));
    } catch (e) {
      this.logger.error(
        `Could not send email for event 'clock.almost.up': ${e}`,
      );
    }
  }

  @OnEvent('draw.proposal.created', { async: true })
  private async handledDawProposalCreatedEvent(
    drawProposal: DrawProposalEntity,
  ) {
    try {
      this.logger.log(
        `GAME[${drawProposal.gameId}] :: Going to send an email for 'draw.proposal.created'`,
      );

      await this.emailClient.sendTemplate(new ProposeDraw(drawProposal));
    } catch (e) {
      this.logger.error(
        `Could not send email for event 'draw.proposal.created': ${e}`,
      );
    }
  }

  @OnEvent('draw.proposal.answer', { async: true })
  private async handledDawProposalAnswerEvent(
    drawProposal: DrawProposalEntity,
  ) {
    try {
      this.logger.log(
        `GAME[${drawProposal.gameId}] :: Going to send an email for 'draw.proposal.answer'`,
      );

      await this.emailClient.sendTemplate(new DrawProposalAnswer(drawProposal));
    } catch (e) {
      this.logger.error(
        `Could not send email for event 'draw.proposal.answer': ${e}`,
      );
    }
  }
}
