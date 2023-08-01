"use strict";

const request = require("supertest");

const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testLunchIds,
  testUserIds,
  testReviewIds,
  testFavoriteIds,
  testuser1Token,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /reviews */

describe("POST /reviews", function () {
  test("works", async function () {
    const resp = await request(app)
        .post(`/reviews`)
        .send({
          reviewText: "yuck!",
          username: "testuser1",
          lunchId: 1,
        })
        .set("authorization", `Bearer ${testuser1Token}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      review: {
        id: null,
        reviewText: "yuck!",
        username: "testuser1",
        lunchId: "1",
      },
    });
  });
});

/************************************** GET /reviews */

describe("GET /reviews", function () {
  test("works", async function () {
    const resp = await request(app).get(`/reviews`);
    expect(resp.body).toEqual({
          reviews: [
            {
             id: null,
             reviewText: 'delicious',
             username: 'testuser1',
             lunchId: "1",
            },
          ],
        },
    );
  });
});

/************************************** GET /reviews/:id */

describe("GET /reviews/:id", function () {
    test("works", async function () {
        const resp = await request(app).get(`/reviews/id:${testReviewIds[0]}`);
        expect(resp.body).toEqual({
            review: {
                id: testReviewIds[0],
                reviewText: 'delicious',
                username: 'testuser1',
                lunchId: 1,
            },
        });
    });

    test("not found for no such review", async function () {
        const resp = await request(app).get(`/reviews/999`);
        expect(resp.statusCode).toEqual(404);
    });
});

/************************************** PATCH /reviews/:id */

describe("PATCH /reviews/:id", function () {
  test("works", async function () {
    const resp = await request(app)
        .patch(`/reviews/${testReviewIds[0]}`)
        .send({
          reviewText: "newText",
        })
        .set("authorization", `Bearer ${testuser1Token}`);
    expect(resp.body).toEqual({
      review: {
        id: testReviewIds[0],
        reviewText: "newText",
        username: "testuser1",
        lunchId: 1,
      },
    });
  });

  test("not found on no such review", async function () {
    const resp = await request(app)
        .patch(`/reviews/null`)
        .send({
          reviewText: "newText",
        })
        .set("authorization", `Bearer ${testuser1Token}`);
    expect(resp.statusCode).toEqual(404);
  });
});

/************************************** DELETE /reviews/:id */

describe("DELETE /reviews/:id", function () {
  test("works", async function () {
    const resp = await request(app)
        .delete(`/reviews/1}`)
        .set("authorization", `Bearer ${testuser1Token}`);
    expect(resp.body).toEqual({ deleted: testReviewIds[0] });
  });

  test("not found for no such review", async function () {
    const resp = await request(app)
        .delete(`/reviews/0`)
        .set("authorization", `Bearer ${testuser1Token}`);
    expect(resp.statusCode).toEqual(404);
  });
});
