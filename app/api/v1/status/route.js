import database from "infra/database";
import { InternalServerError } from "infra/errors";

export async function GET() {
  try {
    const databaseVersion = await database.query("SHOW server_version;");
    const databaseMaxConnections = await database.query(
      "SHOW max_connections;",
    );
    const databaseCurrentConnections = await database.query({
      text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
      values: [process.env.POSTGRES_DB],
    });
    const databaseCurrentConnectionsCount =
      databaseCurrentConnections.rows[0].count;

    return Response.json({
      dependencies: {
        updated_at: new Date().toISOString(),
        database: {
          version: databaseVersion.rows[0].server_version,
          max_connections: parseInt(
            databaseMaxConnections.rows[0].max_connections,
          ),
          opened_connections: databaseCurrentConnectionsCount,
        },
      },
    });
  } catch (error) {
    const publicErrorObject = new InternalServerError({
      cause: error,
    });
    return Response.json(publicErrorObject);
  }
}
