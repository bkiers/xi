import { MailTemplate } from './mail.template';
import { GameEntity } from '../../game/game.entity';
import { DrawProposalEntity } from '../../game/draw.proposal.entity';

export class ProposeDraw extends MailTemplate {
  constructor(readonly drawProposal: DrawProposalEntity) {
    super(
      'propose_draw',
      [drawProposal.proposalAcceptByUser.email],
      'Xi - Draw proposal',
      drawProposal,
    );
  }
}
