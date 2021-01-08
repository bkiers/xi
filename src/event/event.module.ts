import { Module } from '@nestjs/common';
import { EmailEventBus } from './email.event.bus';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [EmailModule],
  providers: [EmailEventBus],
  exports: [EmailEventBus],
})
export class EventModule {}
