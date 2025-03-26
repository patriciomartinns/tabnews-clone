import database from "@/infra/database";
import retry from "async-retry";

async function waitForAllServices() {
  async function webForWebServer() {
    async function featchStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");

      if (!response.ok) {
        throw new Error("Status page is not available yet");
      }
    }

    return retry(featchStatusPage, {
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

const orchestrator = {
  waitForAllServices,
  clearDatabase,
};

export default orchestrator;
