// cleanDatabase.js
import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prisma = new PrismaClient();

async function cleanDatabase() {
  // List all models/tables here to delete their records
  const models = ["Activity", "Event"];

  for (const model of models) {
    // @ts-ignore
    await prisma[model].deleteMany({});
    console.log(`Cleared ${model} table.`);
  }

  console.log("Database cleaned.");
}

cleanDatabase()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
