"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const {sqlForPartialUpdate} = require("../helpers/sql");
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../expressError");

const {BCRYPT_WORK_FACTOR} = require("../config.js");

/** METHODS FOR USERS */

class User {
    /** Authenticate user with username and password
     *  Returns {username, first_name, last_name, email}
     *  Throws Unauthorizederror if user is not found or password is invalid
     */
    static async authenticate(username, password) {
        // look for user
        const result = await db.query(
                `SELECT username, 
                    password,
                    first_name AS "firstName",
                    last_name AS "lastName",
                    email
                FROM users
                WHERE username = $1`,
            [username],
        );

        const user = result.rows[0];

        if (user) {
            // compare hashed password to a new has from password
            const isValid= await bcrypt.compare(password, user.password);
            if (isValid === true) {
                delete user.password;
                return user;
            }
        }

        throw new UnauthorizedError("Invalid username or password");
    }

    /** Register user with data
    *   Returns {id, username, password, firstName, lastName, email}
    *   Throws BadRequestError on duplicates
    */
    static async register({username, password, firstName, lastName, email}) {
        // const duplicateCheck = await db.query(
        //         `SELECT username
        //          FROM users
        //          WHERE username = $1`
        //     [username],
        // );

        // if (duplicateCheck.rows[0]) {
        //     throw new BadRequestError(`Duplicate username: ${username}`);
        // }

        const hashedPassword  = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const result = await db.query(
                `INSERT INTO users
                (username, 
                 password,
                 first_name, 
                 last_name,
                 email)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING username, first_name AS "firstName, last_name AS lastName, email"`,
            [
                username, 
                hashedPassword,
                firstName, 
                lastName,
                email,
            ],
        );

        const user = result.rows[0];
        return user;
    }

    /** Find all users
     *  Returns [{id, username, first_name, last_name, email},...]
     */
    static async findAll() {
        const result = await db.query(
                `SELECT id,
                        username, 
                        first_name AS firstName,
                        last_name AS lastName,
                        email
                 FROM users
                 ORDER BY username`,
        );
        return result.rows;
    }

    /** Given a username, return data about that user
     *  Returns {username, first_name, last_name, email, eaters}
     *      where eaters is {id, diet, allergies, preferences, aversions, lunches, user_id}
     */
    static async get(id) {
        const userRes = await db.query(
                `SELECT id,
                        username,
                        first_name AS "firstName",
                        last_name AS "lastName",
                        email
                 FROM users
                 WHERE id = $1`,
            [id],
        );

        const user = userRes.rows[0];

        if (!user) throw new NotFoundError(`No user: ${id}`);

        return user;
    }

    /** Updates user data with `data 
     *  This is a "partial update" -- it's find if data doesn't contain all
     *  the fields; this only changes provided ones
     * 
     *  Data can include: 
     *      {firstName, lastName, email, eaters}
     *  Returns {username, firstName, lastName, email, eaters}
     *  Throws NotFoundError if not found
    */
    static async update(id, data) {
        if(data.password) {
            data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
        }

        const {setCols, values} = sqlForPartialUpdate(
            data,
            {
                firstName: "first_name",
                lastName:  "last_name",
            });
        const idVarIdx = "$" + (values.length + 1);

        const querySql = `UPDATE users
                          SET ${setCols}
                          WHERE id = ${idVarIdx}
                          RETURNING id,
                                    username,
                                    first_name AS "firstName",
                                    last_name AS "lastName",
                                    email`;
        const result = await db.query(querySql, [...values, id]);
        const user = result.rows[0];

        if (!user) throw new NotFoundError(`No user: ${id}`);

        delete user.password;
        return user;
    }

    /** Delete a given user from database; returns undefined */
    static async remove(id) {
        let result = await db.query(
                `DELETE
                 FROM users
                 WHERE id = $1
                 RETURNING ID`,
            [id],     
        );
        const user = result.rows[0];

        if (!user) throw new NotFoundError(`No user: ${id}`);
    }
}

module.exports = User;