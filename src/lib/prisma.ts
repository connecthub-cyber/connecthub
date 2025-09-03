import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query", "error", "warn"], // utile en debug (tu peux supprimer en prod si trop verbeux)
  });

// En dev, on stocke dans `globalThis` pour éviter de recréer une instance à chaque reload
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}


