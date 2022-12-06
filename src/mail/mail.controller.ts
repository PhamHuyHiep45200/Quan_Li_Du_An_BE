import { Controller, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MailService } from './mail.service';

@ApiTags('send mail')
@Controller('mail')
export class MailController {
  constructor(
    private readonly sendgridService: MailService, // into this
  ) {}
  @Post('send-email')
  async sendEmail(@Query('email') email: string) {
    const mail = {
      to: email,
      subject: 'Hello from sendgrid',
      from: 'huyhiep4520@gmai.com', // Fill it with your validated email on SendGrid account
      text: 'Hello',
      html: '<h1>Hello</h1>',
    };

    return await this.sendgridService.send(mail);
  }
}
