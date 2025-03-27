import database from "infra/database";
import retry from "async-retry";
import migrator from "models/migrator";

async function waitForAllServices() {
  async function webForWebServer() {
    async function fetchStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");

      if (!response.ok) {
        throw new Error("Status page is not available yet");
      }
    }

    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
      onRetry: (e, attempt) => {
        console.error(`Attempt ${attempt} failed: ${e.message}`);
      },
    });
  }

  await webForWebServer();
}

async function clearDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

async function runPendingMigrations() {
  await migrator.runPendingMigrations();
}

const orchestrator = {
  waitForAllServices,
  clearDatabase,
  runPendingMigrations,
};

export default orchestrator;
