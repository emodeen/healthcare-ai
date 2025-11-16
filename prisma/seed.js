const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.task.createMany({
    data: [
      { title: 'First task' },
      { title: 'Second task' },
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
