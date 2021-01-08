import { Module } from '@nestjs/common';
import { EmailClient } from './email.client';

@Module({
  providers: [EmailClient],
  exports: [EmailClient],
})
export class EmailModule {}
