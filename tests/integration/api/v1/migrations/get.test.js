import database from "infra/database";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public;");
});

describe("GET /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("Get pending migrations", async () => {
      const response = await fetch("http://localhost:3000/api/v1/migrations");

      const responseBody = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(responseBody)).toBe(true);
      expect(responseBody.length).toBeGreaterThan(0);
    });
  });
});
