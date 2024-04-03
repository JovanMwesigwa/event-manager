// lib/prisma.ts
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

interface ExtendedNodeJSGlobal {
  prisma?: PrismaClient;
}

declare const global: ExtendedNodeJSGlobal;

// @ts-ignore
let prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
