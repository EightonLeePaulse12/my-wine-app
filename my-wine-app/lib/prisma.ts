import { Prisma, PrismaClient } from "@prisma/client";
declare global {
  var prisma: PrismaClient;
}

if (process.env.NODE_ENV !== "production") {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma as PrismaClient;
} else {
  prisma = new PrismaClient();
}

export default prisma;
