import database from "infra/database";
import { resolve } from "node:path";
import migrationRunner from "node-pg-migrate";

const migrationsRunnerOptions = {
  dryRun: true,
  dir: resolve("infra", "migrations"),
  direction: "up",
  migrationsTable: "pgmigrations",
  log: () => {},
};

async function getPendingMigrations() {
  let dbClient;

  try {
    dbClient = await database.getClient();

    const pendingMigrations = await migrationRunner({
      ...migrationsRunnerOptions,
      dbClient,
    });

    return pendingMigrations;
  } finally {
    await dbClient?.end();
  }
}

async function runPendingMigrations() {
  let dbClient;

  try {
    dbClient = await database.getClient();

    const pendingMigrations = await migrationRunner({
      ...migrationsRunnerOptions,
      dbClient,
      dryRun: false,
    });

    return pendingMigrations;
  } finally {
    await dbClient?.end();
  }
}

const migrator = {
  getPendingMigrations,
  runPendingMigrations,
};

export default migrator;
