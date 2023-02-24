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

describe("GET /api/notARoute", () => {
  test("404: Not found for route that does not exist", () => {
    return request(app)
      .get("/api/notaroute")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Route Does Not Exist");
      });
  });
});

describe("GET /api/mushrooms", () => {
  test("responds with status code 200 and an object in expected format", () => {
    return request(app)
      .get("/api/mushrooms")
      .expect(200)
      .then(({ body: { mushrooms } }) => {
        expect(mushrooms.length).toBeGreaterThan(0);
        mushrooms.forEach((mushroom) => {
          expect(mushroom.commonName).toEqual(expect.any(String));
          expect(mushroom.latinName).toEqual(expect.any(String));
          expect(mushroom.order).toEqual(expect.any(String));
          expect(mushroom.genus).toEqual(expect.any(String));
          expect(mushroom.attributes).toEqual(expect.any(Object));
          expect(mushroom.habitat).toEqual(expect.any(String));
          expect(mushroom.months).toEqual(expect.any(Array));
          expect(mushroom.colors).toEqual(expect.any(Array));
          expect(mushroom.toxic).toEqual(expect.any(Boolean));
          expect(mushroom.averageHeight).toEqual(expect.any(Number));
        });
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

describe("GET /api/reports/:report_id", () => {
  test("responds with status code 200 and report with matching id", () => {
    return request(app)
      .get("/api/reports")
      .then(({ body: { reports } }) => {
        const targetReport = reports[0];
        return targetReport;
      })
      .then((targetReport) => {
        return request(app)
          .get(`/api/reports/${targetReport._id}`)
          .expect(200)
          .then(({ body: { report } }) => {
            expect(report[0]._id).toBe(targetReport._id);
          });
      });
  });
  test("404 not found when given non-existant id", () => {
    return request(app)
      .get("/api/reports/63f4e4c9c133f17e6b7fe312")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Not Found");
      });
  });
  test("400 when given bad id", () => {
    return request(app)
      .get("/api/reports/xxx")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad Request");
      });
  });
});

describe("GET /api/mushrooms/:name", () => {
  test("responds with status code 200 and an object in expected format", () => {
    return request(app)
      .get("/api/mushrooms/Common Mushroom")
      .expect(200)
      .then(({ body: { mushrooms } }) => {
        expect(mushrooms.length).toBeGreaterThan(0);
        mushrooms.forEach((mushroom) => {
          expect(mushroom.commonName).toBe("Common Mushroom");
          expect(mushroom.latinName).toEqual(expect.any(String));
          expect(mushroom.order).toEqual(expect.any(String));
          expect(mushroom.genus).toEqual(expect.any(String));
          expect(mushroom.attributes).toEqual(expect.any(Object));
          expect(mushroom.habitat).toEqual(expect.any(String));
          expect(mushroom.months).toEqual(expect.any(Array));
          expect(mushroom.colors).toEqual(expect.any(Array));
          expect(mushroom.toxic).toEqual(expect.any(Boolean));
          expect(mushroom.averageHeight).toEqual(expect.any(Number));
        });
      });
  });
  test("responds with status code 400 when provided a name that doesn't exist", () => {
    return request(app)
      .get("/api/mushrooms/NotAMushroom")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  });
});

describe("POST /api/report", () => {
  test("responds with status code 201 and an object in expected format", () => {
    return request(app)
      .post("/api/reports")
      .send({
        report: {
          location: { lat: 0.0, long: 0.0 },
          img_url: "https://example.com/mushroom1.jpg",
          username: "user1",
          time_stamp: "2023-01-01T00:00:00Z",
          notes: "This is a test",
          species: { species: "Common Mushroom", votes: 1 },
          prevalence: 1.0,
        },
      })
      .expect(201)
      .then(({ _body: { report } }) => {
        expect(report.location).toEqual({ lat: 0.0, long: 0.0 });
        expect(report.img_url).toBe("https://example.com/mushroom1.jpg");
        expect(report.username).toBe("user1");
        expect(report.time_stamp).toBe("2023-01-01T00:00:00Z");
        expect(report.species).toEqual({
          species: "Common Mushroom",
          votes: 1,
        });
        expect(report.credibility).toEqual(expect.any(Number));
        expect(report.alternate_species).toEqual(expect.any(Array));
        expect(report.prevalence).toBe(1.0);
      });
  });
  test("responds with status code 400 when provided a report with missing keys", () => {
    return request(app)
      .post("/api/reports")
      .send({
        report: {},
      })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  });
});

describe("PATCH /api/report/:report_id", () => {
  test("responds with status code 201 and an object with the appropriate vote count updated", () => {
    const suggestedSpecies = "Fly Agaric";
    let prevVotes = 0;
    let targetReport = {};

    return request(app)
      .get("/api/reports")
      .then(({ body: { reports } }) => {
        targetReport = reports[0];
        prevVotes =
          targetReport.alternate_species.filter((species) => {
            return species.species === suggestedSpecies;
          })[0]?.votes ?? 0;
      })
      .then(() => {
        return request(app)
          .patch(`/api/reports/${targetReport._id}`)
          .send({ suggestedSpecies })
          .expect(201)
          .then(
            ({
              body: {
                report: { alternate_species },
              },
            }) => {
              updatedVotes = alternate_species.filter((species) => {
                return species.species === suggestedSpecies;
              })[0].votes;
              expect(updatedVotes).toBe(prevVotes + 1);
            }
          );
      });
  });
  test("responds with status code 400 when provided a report_id that doesn't exist", () => {
    const suggestedSpecies = "Fly Agaric";
    let prevVotes = 0;
    let targetReport = {};

    return request(app)
      .get("/api/reports")
      .then(({ body: { reports } }) => {
        targetReport = reports[0];
        prevVotes =
          targetReport.alternate_species.filter((species) => {
            return species.species === suggestedSpecies;
          })[0]?.votes ?? 0;
      })
      .then(() => {
        return request(app)
          .patch("/api/reports/999999")
          .send({ suggestedSpecies })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Bad request");
          });
      });
  });
  test("responds with status code 400 when provided a mushroom that doesn't exist", () => {
    const suggestedSpecies = "Not a Mushroom";
    let prevVotes = 0;
    let targetReport = {};

    return request(app)
      .get("/api/reports")
      .then(({ body: { reports } }) => {
        targetReport = reports[0];
        prevVotes =
          targetReport.alternate_species.filter((species) => {
            return species.species === suggestedSpecies;
          })[0]?.votes ?? 0;
      })
      .then(() => {
        return request(app)
          .patch(`/api/reports/${targetReport._id}`)
          .send({ suggestedSpecies })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Bad request");
          });
      });
  });
});
