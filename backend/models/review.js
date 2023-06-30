"use strict";

const db = require("../db");
const {NotFoundError} = require("../expressError");
const {sqlForPartialUpdate} = require("../helpers/sql");

/** METHODS FOR REVIEWS */

class Review {
    
    /** Creates a review (from data), update db, return new review data
     *  Data should include {id, reviewText, userId, lunchId}
     */
    static async create ({reviewText, userId, lunchId}) {
       const result = await db.query(
                `INSERT INTO reviews
                 (review_text, user_id, lunch_id)
                 VALUES ($1, $2, $3)
                 RETURNING id, review_text AS "reviewText", user_id AS "userId", lunch_id AS "lunchId"`,
            [
                reviewText,
                userId,
                lunchId,
            ],
       );
       const review = result.rows[0];
       return review;
    }

    /** Finds all reviews
     *  Returns [{id, reviewText, userId, lunchId}, ...]
     */
    static async findAll() {
        let query = `SELECT id,
                            review_text AS "reviewText",
                            user_id AS "userId",
                            lunch_id AS "lunchId"
                     FROM reviews`;
        
        query += " ORDER BY id";
        const reviewRes = await db.query(query);
        return reviewRes.rows;
    }

    /** Given a review id, return data about a review
     *  Returns [{id, reviewText, userId, lunchId}, ...]
     *  Throws NotFoundError if review is not found
     */
    static async get(id) {
        const reviewRes = await db.query(
                `SELECT id,
                        review_text AS "reviewText",
                        user_id AS "userId",
                        lunch_id AS "lunchId"
                 FROM reviews
                 WHERE id = $1`,
            [id]);
        
        const review = reviewRes.rows[0];

        const lunchRes = await db.query(
                `SELECT id,
                        title,
                        description, 
                        protein,
                        fruit,
                        vegetable,
                        fat,
                        sweet, 
                        beverage
                 FROM lunches
                 WHERE lunch_id = $1`,
            [lunch_id]
        );

        review.lunch = lunchRes.rows;

        return review;
    }

    /** Update reviewText with data
     *  Returns {id, reviewText, userId, lunchId}
     *  Throws NotFoundError if review is not found
     */
    static async update(id, data) {
        const {setCols, values} = sqlForPartialUpdate(
            data,
            {
                reviewText: "review_text",
                userId: "user_id",
                lunchId: "lunch_id",
            });
        const idVarIdx = "$" + (values.length + 1);
        const querySql = `UPDATE reviews
                          SET ${setCols}
                          WHERE id = ${idVarIdx}
                          RETURNING id, 
                                    review_text AS "reviewText",
                                    user_id AS "userId",
                                    lunch_id AS "lunchId"`
        const result = await db.query(querySql, [...values, id]);
        const review = result.rows[0];

        if (!review) throw new NotFoundError(`No review found: ${id}`);

        return review;                             
    }

    /** Deletes a given review from database; returns undefined
     *  Throws NotFoundError if review is not found
     */
    static async remove(id) {
        const result = await db.query(
                `DELETE 
                 FROM reviews
                 WHERE id = $1
                 RETURNING id`,
            [id]);
        const review = result.rows[0];
        if (!review) throw new NotFoundError(`No review found: ${id}`);
    }

}

module.exports = Review;