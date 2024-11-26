import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  await prisma.user.create({
    data: {
      email,
      password: { create: { hash: hashedPassword, }, },
      accountName: 'Jacob McPerson',
      avatarId: '',
      desc: 'Music maven, Ceramicist. Devoted coffee enthuasist',
      linkedin: 'https://www.linkedin.com/in/allan-simoyi',
      phone: '+263779528194',
      website: 'allansimoyi.com',
      ig: 'instagram.com/simoyiallan',
      twitter: 'x.com/simoyi_allan',
      youtube: 'https://www.youtube.com/channel/UCtpkhivq4wu5Axonq-XVpsA',
      whatsapp: '+263779528194',
      facebook: 'https://www.facebook.com/allan.simoyi',
      tiktok: '',
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
