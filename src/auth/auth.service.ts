import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async loginAuth(createAuthDto: CreateAuthDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: createAuthDto.email,
      },
    });
    if (user) {
      if (user.password === createAuthDto.password) {
        return { status: 200, user };
      } else {
        return {
          status: 400,
          message: 'Vui lòng kiểm tra lại thông tin đăng nhập',
        };
      }
    } else {
      return {
        status: 400,
        message: 'Vui lòng kiểm tra lại thông tin đăng nhập',
      };
    }
  }
}
