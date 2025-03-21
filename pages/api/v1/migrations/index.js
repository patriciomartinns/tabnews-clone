import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";

export default async function migrations(request, response) {
  if (!["GET", "POST"].includes(request.method)) {
    return response.status(405).end();
  }

  const migrations = await migrationRunner({
    databaseUrl: process.env.DATABASE_URL,
    dryRun: request.method === "GET",
    dir: resolve("infra", "migrations"),
    direction: "up",
    migrationsTable: "pgmigrations",
    verbose: true,
  });

  if (request.method === "POST" && migrations.length > 0) {
    return response.status(201).json(migrations);
  }

  return response.status(200).json(migrations);
}
