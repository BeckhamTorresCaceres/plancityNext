import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Prisma CLI uses the session pooler for read-only introspection and schema commands.
    // Review any schema plan before running migrations against the existing Supabase database.
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "",
  },
});
