import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './mail.service';
import { MailServiceFromNodeMailer } from './mailFromNodemailer.service';

@Module({
  imports: [ConfigModule],
  providers: [MailService, MailServiceFromNodeMailer],
  exports: [MailService, MailServiceFromNodeMailer],
})
export class MailModule {}
