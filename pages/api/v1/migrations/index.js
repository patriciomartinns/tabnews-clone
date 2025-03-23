import database from "@/infra/database";
import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";

export default async function migrations(request, response) {
  const allowedMethods = ["GET", "POST"];
  if (!allowedMethods.includes(request.method)) {
    return response.status(405).json({
      error: `Method ${request.method} Not Allowed`,
    });
  }

  const dbClient = await database.getClient();

  const migrations = await migrationRunner({
    dbClient,
    dryRun: request.method === "GET",
    dir: resolve("infra", "migrations"),
    direction: "up",
    migrationsTable: "pgmigrations",
    verbose: true,
  });

  if (request.method === "POST" && migrations.length > 0) {
    await dbClient.end();
    return response.status(201).json(migrations);
  }

  await dbClient.end();

  return response.status(200).json(migrations);
}
