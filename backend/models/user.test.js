"use strict";

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");
const db = require("../db.js");
const User = require("./user.js");

/****************************************************** authenticate  */
describe("authenticate", function () {
    test("works", async function() {
        const user = await User.authenticate("u1", "password1");
        expect(user).toEqual({
            username: "u1",
            firstName: "U1F",
            lastName: "U1L",
            email: 'u1@email.com',
            diet: 'standard',
            allergies: "eggs",
            preferences: "cheese",
            aversions: "asparagus",
        });
    });

    test ("unauthorized if no such user", async function () {
        try {
            await User.authenticate("none", "password");
            fail(); 
        } catch (err) {
            expect(err instanceof UnauthorizedError).toBeTruthy();
        }
    });
})