import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const post1 = await prisma.user.upsert({
    where: { email: 'huyhiep4520@gmail.com' },
    update: {},
    create: {
      firstName: 'huy',
      lastName: 'hiep',
      birthday: new Date(),
      email: 'huyhiep4520@gmail.com',
      password: '123456',
      thumbnail: '',
      phone: '0375713278',
      gender: 'Nam',
      role: 'ADMIN',
      deleteFlg: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const post2 = await prisma.user.upsert({
    where: { email: 'huyhiep4520@gmail.com' },
    update: {},
    create: {
      firstName: 'Phong',
      lastName: 'Phong',
      birthday: new Date(),
      email: 'phongk@gmail.com',
      password: '123456',
      thumbnail: '',
      phone: '0375713278',
      gender: 'Nam',
      role: 'ADMIN',
      deleteFlg: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  console.log({ post1, post2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
