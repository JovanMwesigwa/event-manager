// dropDatabase.js
import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prisma = new PrismaClient();

async function dropDatabase() {
  await prisma.$executeRawUnsafe("DROP SCHEMA public CASCADE;");
  await prisma.$executeRawUnsafe("CREATE SCHEMA public;");
  console.log("Database dropped and schema recreated.");
}

dropDatabase()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
