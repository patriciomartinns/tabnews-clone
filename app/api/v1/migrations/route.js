import database from "infra/database";
import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";

export async function GET() {
  const dbClient = await database.getClient();

  const migrations = await migrationRunner({
    dbClient,
    dryRun: true,
    dir: resolve("infra", "migrations"),
    direction: "up",
    migrationsTable: "pgmigrations",
    verbose: true,
  });

  await dbClient.end();

  return Response.json(migrations, {
    status: 200,
  });
}

export async function POST() {
  const dbClient = await database.getClient();

  const migrations = await migrationRunner({
    dbClient,
    dryRun: false,
    dir: resolve("infra", "migrations"),
    direction: "up",
    migrationsTable: "pgmigrations",
    verbose: true,
  });

  await dbClient.end();

  return Response.json(migrations, {
    status: migrations.length > 0 ? 201 : 200,
  });
}
