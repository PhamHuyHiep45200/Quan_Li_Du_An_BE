import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExecutionStatus } from '../../utils/responses.common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer');

type MailInput = {
  to: string;
  subject: string;
  html: string;
};

@Injectable()
export class MailServiceFromNodeMailer {
  constructor(private readonly configService: ConfigService) {}
  async sendMailByNodemailer(input: MailInput) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get('EMAIL_USER'), // generated ethereal user
        pass: this.configService.get('EMAIL_PASSWORD'), // generated ethereal password
      },
    });

    // send mail with defined transport object
    const options = await transporter.sendMail({
      from: this.configService.get('EMAIL_USER'), // sender address
      to: input.to, // list of receivers
      subject: input.subject, // Subject line
      html: input.html, // html body
    });
    transporter.sendMail(options).catch((error) => {
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
