const app = require("../server");
const supertest = require("supertest");

describe("A valid response is expected when all parameters are given correctly", () => {
  test("POST /api/records", async () => {
    const resPayload = {
      startDate: "2016-01-26",
      endDate: "2018-02-02",
      minCount: 2700,
      maxCount: 3000,
    };
    await supertest(app)
      .post("/api/records")
      .send(resPayload)
      .then(async (response) => {
        // Check the response
        expect(response.body.code).toBe(0);
        expect(response.body.msg).toBe("success");
        let len = response.body.records.length;
        expect(len > 0).toBeTruthy();
      });
  });
});

describe("No records should be returned when date range is invalid, the response code is 422", () => {
  test("POST /api/records", async () => {
    const resPayload = {
      startDate: "2016-01-0x",
      endDate: "2018-02-0y",
      minCount: 2700,
      maxCount: 3000,
    };
    await supertest(app)
      .post("/api/records")
      .send(resPayload)
      .then(async (response) => {
        // Check the response
        expect(response.body.code).toBe(422);
        expect(response.body.msg).toBe(
          "startDate requires a date. e.g. 2016-01-26,endDate requires a date. e.g. 2018-02-0.2"
        );
        let len = response.body.records.length;
        expect(len === 0).toBeTruthy();
      });
  });
});

describe("No records should be returned when min-max range given as number-string format, the response code is 0", () => {
  test("POST /api/records", async () => {
    const resPayload = {
      startDate: "2016-01-06",
      endDate: "2018-02-02",
      minCount: "2700",
      maxCount: "3000",
    };
    await supertest(app)
      .post("/api/records")
      .send(resPayload)
      .then(async (response) => {
        // Check the response
        expect(response.body.code).toBe(0);
        expect(response.body.msg).toBe("success");
        let len = response.body.records.length;
        expect(len === 0).toBeTruthy();
      });
  });
});

describe("No records should be returned when min-max range is empty, the response code is 422", () => {
  test("POST /api/records", async () => {
    const resPayload = {
      startDate: "2016-01-06",
      endDate: "2018-02-02",
      minCount: "",
      maxCount: "",
    };
    await supertest(app)
      .post("/api/records")
      .send(resPayload)
      .then(async (response) => {
        // Check the response
        expect(response.body.code).toBe(422);
        expect(response.body.msg).toBe(
          "minCount requires a number. e.g. 3000,maxCount requires a number. e.g. 3000"
        );
        let len = response.body.records.length;
        expect(len === 0).toBeTruthy();
      });
  });
});
