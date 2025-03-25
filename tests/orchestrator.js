import retry from "async-retry";

async function waitForAllServices() {
  async function webForWebServer() {
    async function featchStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");

      await response.json();
    }

    return retry(featchStatusPage, { retries: 100 });
  }

  await webForWebServer();
}

export default {
  waitForAllServices,
};
