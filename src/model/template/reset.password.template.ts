import { MailTemplate } from './mail.template';
import { ResetPasswordEntity } from '../../auth/reset.password.entity';

export class ResetPasswordTemplate extends MailTemplate {
  constructor(readonly entity: ResetPasswordEntity) {
    super('reset_password', entity.user.email, 'Xi - Reset password', entity);
  }
}
