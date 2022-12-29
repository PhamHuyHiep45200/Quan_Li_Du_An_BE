import { Injectable } from '@nestjs/common';
import { MailServiceFromNodeMailer } from 'src/mail/mailFromNodemailer.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExecutionStatus } from 'src/utils/responses.common';
import { CreateUserDto } from './dto/create-user.dto';
import { ForgotDto } from './dto/forgot-pass.dto';
import { ForgotpassWord } from './dto/forgot-password.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { UpdateDeleteUserDto } from './dto/update-delete.dto';
import { UpdateIfnoUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private mailServiceFromNodeMailer: MailServiceFromNodeMailer,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.findFirst({
      where: { email: createUserDto.email },
    });
    if (user) {
      return { status: 400, message: 'Tài khoản này đã được đăng kí' };
    }
    const password = `shark_${Math.floor(Math.random() * 101)}${Math.floor(
      Math.random() * 101,
    )}`;

    const sendMail = await this.mailServiceFromNodeMailer.sendMailByNodemailer({
      to: createUserDto.email,
      subject: 'shark hello!!!',
      html: `<h1 class="color:green">Chúc mừng bạn đăng kí thành công. Vui lòng không chia sẻ mật khẩu này cho bất kì ai</h1> <div>Mật khẩu của bạn: ${password}</div>`,
    });
    await this.prisma.user.create({
      data: { ...createUserDto, password, deleteFlg: false },
    });

    if (sendMail.status == ExecutionStatus.OK) {
      return {
        status: 200,
        message:
          'Đăng kí thành công. Vui lòng check mật khẩu tại gmail mà bạn đã đăng kí.',
      };
    } else {
      return sendMail;
    }
  }

  async findAll() {
    const data = await this.prisma.user.findMany({});
    return { status: 200, data };
  }

  async findOne(id: number) {
    const data = await this.prisma.user.findFirst({
      where: { id },
    });
    return { status: 200, data };
  }
  async searchUser(search: SearchUserDto) {
    const data = await this.prisma.user.findMany({
      where: {
        email: {
          contains: search.q,
        },
      },
    });
    return { status: 200, data };
  }

  async getUserProjectAll(id_project: number) {
    const data = await this.prisma.project.findMany({
      where: { id: id_project },
      include: {
        UserProject: {
          include: {
            User: { include: { UserGroup: { include: { Group: true } } } },
          },
        },
      },
    });
    return { status: 200, data };
  }
  async updateDelete(updateDeleteUserDto: UpdateDeleteUserDto, id: number) {
    const data = await this.prisma.user.update({
      where: { id },
      data: { deleteFlg: updateDeleteUserDto.status },
    });
    return { status: 200, data };
  }
  async updateInfoUser(id: number, updateIfnoUserDto: UpdateIfnoUserDto) {
    console.log(updateIfnoUserDto);

    const data = await this.prisma.user.update({
      where: { id },
      data: updateIfnoUserDto,
    });
    return { status: 200, data };
  }
  async forgotPassEmail(data: ForgotDto) {
    const user = await this.prisma.user.findFirst({
      where: { email: data.email },
    });
    console.log(data, user);

    if (user) {
      const sendMail =
        await this.mailServiceFromNodeMailer.sendMailByNodemailer({
          to: data.email,
          subject: 'shark hello!!!',
          html: `<span>Chúng tôi phát hiện có người thực hiện quên mật khẩu trên tài khoản của bạn. Nhấp vào đường link bên dưới để thay đổi mật khẩu</span>
        <div>
        <a href="http://localhost:3000/change-pasword/${user.id}">link</a>
        </div>`,
        });
      if (sendMail.status == ExecutionStatus.OK) {
        return {
          status: 200,
          message: 'Vui lòng check email để thay đổi mật khẩu.',
        };
      } else {
        return sendMail;
      }
    } else {
      return { status: 400, message: 'tài khoản này không tồn tại' };
    }
  }
  async forgotPassWord(id: number, forgotpassWord: ForgotpassWord) {
    const data = await this.prisma.user.update({
      where: { id },
      data: { password: forgotpassWord.password },
    });
    return { status: 200, data };
  }
}
