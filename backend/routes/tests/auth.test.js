"use strict";

const request = require('supertest');
const app = require('../app');

const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
} = require("./_testCommon");

commonBeforeAll(commonBeforeAll);
commonBeforeEach(commonBeforeEach);
commonAfterEach(commonAfterEach);
commonAfterAll(commonAfterAll);


/** POST /auth/token *****************************************************************/

describe('POST /auth/token', () => {
    test('should successfully log in a user', async () => {
        const response = await request(app)
            .post('/auth/token')
            .send({
                username: "testuser",
                password: 'password'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            username: 'testuser',
            token: expect.any(String)
        });
    });

    test('shouldn not allow a user to log in with invalid credentials', async () => {
        const response = await request(app)
            .post('/auth/token')
            .send({
                username: 'testuser',
                password: 'wrong'
            });
        expect(response.statusCode).toBe(401);
    });
});

/** POST auth/regiester ************************************************************ */
describe('POST /auth/register', () => {
    test('should successfully register a user', async () => {
        const response = await request(app)
        .post('/auth/register')
        .send({
            username: 'testuser3',
            password: 'password'
        });
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({
            username: 'testuser3',
            token: expect.any(String)
        });
    });

    test('should not register a user with a username already in the database', async () {
        const response = await request(app)
            .post('/auth/register')
            .send({
                username: 'testuser',
                password: 'password'
            });
        expect(response.statusCode).toBe(400); 
    });
});