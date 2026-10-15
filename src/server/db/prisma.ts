import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as typeof globalThis & {
  __plancityPrisma?: PrismaClient;
};

let productionPrisma: PrismaClient | undefined;

/** Server-only Prisma client. Keep this module out of client component imports. */
export function getPrisma(): PrismaClient {
  const existing =
    process.env.NODE_ENV === "production"
      ? productionPrisma
      : globalForPrisma.__plancityPrisma;

  if (existing) return existing;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is required to access the database.");
  }

  const client = new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  });

  if (process.env.NODE_ENV === "production") {
    productionPrisma = client;
  } else {
    globalForPrisma.__plancityPrisma = client;
  }

  return client;
}
