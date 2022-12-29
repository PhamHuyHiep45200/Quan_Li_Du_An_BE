import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExecutionStatus } from 'src/utils/responses.common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sgMail = require('@sendgrid/mail');

type MailInput = {
  to: string;
  subject: string;
  html: string;
};

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {
    sgMail.setApiKey(configService.get('SENDGRID_API_KEY'));
  }

  async sendMail(input: MailInput) {
    const msg = {
      from: this.configService.get('FROM_EMAIL'),
      to: input.to,
      subject: input.subject,
      text: 'and easy to do anywhere, even with Node.js',
      html: input.html,
    };
    await sgMail.send(msg).catch((error) => {
      console.log('error: ', error);
      console.log('error: ', error.response.body);
      return {
        status: ExecutionStatus.FAILED,
        data: error.toString(),
      };
    });
    return {
      status: ExecutionStatus.OK,
      message: 'Email sent',
    };
  }
}
