/**
 * Clean CommonJS Prisma config for CLI.
 * Reads DATABASE_URL from server/.env via dotenv.
 */
require("dotenv").config({ path: "./.env" });

module.exports = {
  schema: "prisma/schema.prisma",
  datasource: {
    provider: "mysql",
    url: process.env.DATABASE_URL,
  },
  migrations: {
    path: "prisma/migrations",
  },
};