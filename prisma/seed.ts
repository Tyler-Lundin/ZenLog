import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import SeedData from './seed.data';

async function main() {

  await prisma.exercise.deleteMany();
  for (const exercise of SeedData) {
    await prisma.exercise.create({
      data: exercise
    });
  }
  console.log('Exercise seed complete');

  process.exit(0);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

