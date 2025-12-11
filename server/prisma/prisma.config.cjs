/**
 * CommonJS Prisma config so the CLI can load it without TS transpilation.
 * Loads environment from server/.env via dotenv.
 */
require('dotenv').config();

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