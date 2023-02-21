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

describe("GET /api/reports", () => {
  test("responds with status code 200 and an object in expected format", () => {
    return request(app)
      .get("/api/reports")
      .expect(200)
      .then(({ body: { reports } }) => {
        expect(reports.length).toBeGreaterThan(0);
        reports.forEach((report) => {
          expect(report.location).toEqual(expect.any(Object));
          expect(report.img_url).toEqual(expect.any(String));
          expect(report.username).toEqual(expect.any(String));
          expect(report.time_stamp).toEqual(expect.any(String));
          expect(report.species).toEqual(expect.any(Object));
          expect(report.credibility).toEqual(expect.any(Number));
          expect(report.alternate_species).toEqual(expect.any(Array));
          expect(report.prevalence).toEqual(expect.any(Number));
        });
      });
  });
});
