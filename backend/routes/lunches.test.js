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
    testuser1Token,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/****************************************************** POST /lunches */

describe("POST /lunches", function() {
    const newLunch = {
        id: 3,
        title: "testLunch3", 
        description: "testLunch3 description",
        protein: "testProtein",
        carb: "testCarb",
        fruit: "testFruit",
        vegetable: "testVegetable",
        fat: "testFat",
        sweet: "testSweet",
        beverage: "testBeverage",
    };

    test("works", async function () {
        const resp = await request(app)
            .post("/lunches")
            .send(newLunch)
            .set("authorization", `Bearer ${testuser1Token}`);
        expect(resp.statusCode).toEqual(201);
    });
});

/*********************************************************** GET /lunches */

describe("GET /lunches", function() {
    test ("works", async function() {
        const resp = await request(app).get("/lunches");
        expect(resp.body).toEqual({
            lunches:
                [
                    {
                        id: null,
                        title: "ham sandwich", 
                        description: "ham and cheese",
                        protein: "ham", 
                        carb: "wheat bread", 
                        fruit: "apple", 
                        vegetable: "baby carrots", 
                        fat: "american cheese", 
                        sweet: "oreos", 
                        beverage: "gatorade",
                    },
                    {
                        id: null,
                        title: "PBJ", 
                        description: "peanut butter and jelly",
                        protein: "peanut butter", 
                        carb: "sourdough bread", 
                        fruit: "clementine", 
                        vegetable: "celery", 
                        fat: "string cheese", 
                        sweet: "fruit leather", 
                        beverage: "whole milk",
                    },
                ],
        });
    });

    test("not found if no lunches", async function() {
        const resp = await request(app).get(`/lunches/7`);
        expect(resp.statusCode).toEqual(404);
    })
});

/*********************************************************** GET /lunches/:id */

describe("GET /lunches/:id", function() {
    test ("works", async function() {
        const resp = await request(app).get(`/lunches/1`);
        expect(resp.body).toEqual({
            lunch: {
                id: 1,
                title: "ham sandwich", 
                protein:"ham", 
                carb: "wheat bread", 
                fruit: "apple", 
                vegetable: "baby carrots", 
                fat: "american cheese", 
                sweet: "oreos", 
                beverage: "gatorade",
                reviews: [],
            },
                   
        });
    });

    test("not found for no such lunch", async function () {
        const resp = await request(app).get(`/lunches/999`);
        expect(resp.statusCode).toEqual(404);
    });
});

/************************************** PATCH /lunches/:id */

describe("PATCH /lunches/:id", function () {
    test("works", async function () {
      const resp = await request(app)
          .patch(`/lunches/${1}`)
          .send({
            title: "Lunch1-new",
          })
          .set("authorization", `Bearer ${testuser1Token}`);
      expect(resp.body).toEqual({
        lunch: {
          id: 1,  
          title: "Lunch1-new",
          protein:"ham", 
          carb: "wheat bread", 
          fruit: "apple", 
          vegetable: "baby carrots", 
          fat: "american cheese", 
          sweet: "oreos", 
          beverage: "gatorade",
          reviews: [],
        },
      });
    });

    test("not found on no such lunch", async function () {
        const resp = await request(app)
            .patch(`/lunches/999`)
            .send({
              title: "new nope",
            })
            .set("authorization", `Bearer ${testuser1Token}`);
        expect(resp.statusCode).toEqual(404);
    });
});

/************************************** DELETE /lunches/:id */

describe("DELETE /lunches/:id", function() {
    test("works", async function() {
        const resp = await request(app)
            .delete(`/lunches/1`)
            .set("authorization", `Bearer ${testuser1Token}`)
        expect(resp.body).toEqual({deleted: "testuser1"});
    });

    test("not found for no such lunch", async function () {
        const resp = await request(app)
            .delete(`/lunches/999`)
            .set("authorization", `Bearer ${testuser1Token}`);
        expect(resp.statusCode).toEqual(404);
      });
})