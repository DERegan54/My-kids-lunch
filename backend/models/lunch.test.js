"use strict";

const db = require("../db.js");
const{ BadRequestError, NotFoundError} = require("../expressError");
const Lunch = require("./lunch.js");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
} = require("./_testCommon.js")

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/**************************************************************** create */

describe("create", function() {
    let newLunch = {
        title: "New",
        description: "new description",
        protein: "newProtein",
        carb: "newCarb",
        fruit: "newFruit",
        vegetable: "newVegetable",
        fat: "newFat",
        sweet: "newSweet",
        beverage: "newBeverage",
    };

    test("works", async function () {
        let lunch = await Lunch.create(newLunch);
        expect(lunch).toEqual({
            ...newLunch,
            id: expect.any(Number),
        });
    })
});

/**************************************************************** findAll */

describe("findAll", function () {
    test("works", async function () {
        let lunches = await Lunch.findAll();
        expect(lunches.length).toEqual(2);
        expect(lunches).toContainEqual({
            id: expect.any(Number),
            title: 'Ham Sandwich',
            description: 'ham and cheese', 
            protein: 'ham',
            carb: 'wheat bread',
            fruit: 'apple', 
            vegetable: 'baby carrots',
            fat: 'american cheese', 
            sweet: 'oreos',
            beverage: 'gatorade',
        });
        expect(lunches).toContainEqual({
            id: expect.any(Number),
            title: 'PBJ',
            description: 'peanut butter and jelly', 
            protein: 'peanut butter',
            carb: 'sourdough bread',
            fruit: 'clementine', 
            vegetable: 'celery',
            fat: 'string cheese', 
            sweet: 'fruit leather',
            beverage: 'whole milk',
        });
    });
});

/**************************************************************** get */

describe("get", function() {
    // test('works', async function() {
    //     let lunch = await Lunch.get(1);
    //     expect(lunch).toEqual({
    //         id: expect.any(Number),
    //         title: 'Ham Sandwich',
    //         description: 'ham and cheese', 
    //         protein: 'ham',
    //         carb: 'wheat bread',
    //         fruit: 'apple', 
    //         vegetable: 'baby carrots',
    //         fat: 'american cheese', 
    //         sweet: 'oreos',
    //         beverage: 'gatorade',
    //     });
    // });

    test('not found if no such lunch', async function() {
        try {
            await Lunch.get(7);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});


/**************************************************************** update */

describe("update", function () {
    // test('works', async function() {
    //     let updatedLunch = await Lunch.update(1, {description: 'Ham and cheese sandwich'});
    //     expect(updatedLunch).toContainEqual({
    //         id: expect.any(Number),
    //         title: 'Ham Sandwich',
    //         description: 'Ham and cheese sandwich', 
    //         protein: 'ham',
    //         carb: 'wheat bread',
    //         fruit: 'apple', 
    //         vegetable: 'baby carrots',
    //         fat: 'american cheese', 
    //         sweet: 'oreos',
    //         beverage: 'gatorade',
    //     });
    // });

    test("not found if no such lunch", async function () {
        try {
          await Lunch.update(0, {
            title: "test",
          });
          fail();
        } catch (err) {
          expect(err instanceof NotFoundError).toBeTruthy();
        }
      });
});

/**************************************************************** remove */

describe("remove", function () {
    // test('works', async function() {
    //     let result = await Lunch.remove(1);
    //     expect(result).toContainEqual({
    //         id: expect.any(Number),
    //     });
    // });

    test('not found if no such lunch', async function () {
        try {
            await Lunch.remove(0);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});

