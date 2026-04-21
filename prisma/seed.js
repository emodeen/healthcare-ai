const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.contact.createMany({
    data: [
      { title: 'First contact' },
      { title: 'Second contact' },
      { title: 'Buy milk' }
    ]
  });
  console.log('Seed complete (js)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
