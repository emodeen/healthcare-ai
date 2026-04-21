import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.contact.createMany({
    data: [
      { title: 'First contact' },
      { title: 'Second contact' },
      { title: 'Buy milk' }
    ]
  });
  console.log('Seed complete');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
