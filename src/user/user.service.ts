import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from 'src/providers/mail/mail.service';
import { MailServiceFromNodeMailer } from 'src/providers/mail/mailFromNodemailer.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ExecutionStatus } from '../utils/responses.common';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
    private mailServiceFromNodeMailer: MailServiceFromNodeMailer,
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async sendmailTest(data: any) {
    const sendMail = await this.mailServiceFromNodeMailer.sendMailByNodemailer({
      to: 'male5@yopmail.com',
      subject: 'mail hello',
      html: 'kokokokokokokokokokokoakokaokoakoakoakoakaokaokao aokokaokaokaokaokaokaokaokao',
    });
    // const sendMail = await this.mailService.sendMail({
    //   to: 'male5@yopmail.com',
    //   subject: 'mail hello',
    //   html: 'kokokokokokokokokokokoakokaokoakoakoakoakaokaokao aokokaokaokaokaokaokaokaokao',
    // });
    if (sendMail.status == ExecutionStatus.OK) {
      return {
        status: ExecutionStatus.OK,
        message: sendMail.message,
      };
    } else {
      return sendMail;
    }
  }

  findAll() {
    return this.prisma.user.findMany({ where: { deleteFlg: false } });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
