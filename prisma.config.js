// Prisma config (JavaScript). Used by Prisma CLI; not required for Next.js runtime.
require("dotenv/config");

module.exports = {
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
};
