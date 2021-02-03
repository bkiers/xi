import { MailTemplate } from './mail.template';
import { GameEntity } from '../../game/game.entity';
import { DrawProposalEntity } from '../../game/draw.proposal.entity';

export class DrawProposalAnswer extends MailTemplate {
  constructor(readonly drawProposal: DrawProposalEntity) {
    super(
      'draw_proposal_answer',
      [drawProposal.proposalSentByUser.email],
      'Xi - Draw proposal answer',
      drawProposal,
    );
  }
}
