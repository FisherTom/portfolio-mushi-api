const request = require("supertest");
const app = require("../app/app");
const testData = require("../db/data/test-data/");
const mongoose = require("mongoose");
const seed = require("../db/seeds/seed");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  mongoose.connection.close();
});

describe("GET /api/mushrooms", () => {
  test("200: resolves with a mushrooms array", () => {
    return request(app)
      .get("/api/mushrooms")
      .expect(200)
      .then(({ body: { mushrooms } }) => {
        expect(mushrooms).toBeInstanceOf(Array);
        expect(mushrooms).toHaveLength(27);
      });
  });
});
