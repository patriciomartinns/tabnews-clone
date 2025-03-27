import { createRouter } from "next-connect";
import database from "infra/database";
import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import controller from "infra/controller";

const router = createRouter();

router.get(getHandler);
router.post(postHandler);

const migrationsRunnerOptions = {
  dryRun: true,
  dir: resolve("infra", "migrations"),
  direction: "up",
  migrationsTable: "pgmigrations",
  verbose: true,
};

async function getHandler(_, response) {
  let dbClient;
  try {
    dbClient = await database.getClient();

    const pendingMigrations = await migrationRunner({
      ...migrationsRunnerOptions,
      dbClient,
    });

    return response.status(200).json(pendingMigrations);
  } finally {
    await dbClient.end();
  }
}

async function postHandler(_, response) {
  let dbClient;

  try {
    dbClient = await database.getClient();

    const migratedMigrations = await migrationRunner({
      ...migrationsRunnerOptions,
      dbClient,
      dryRun: false,
    });

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }

    return response.status(200).json(migratedMigrations);
  } finally {
    await dbClient.end();
  }
}

export default router.handler(controller.errorHandlers);
