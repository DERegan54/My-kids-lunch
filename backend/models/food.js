"use strict";

const db = require("../db");
const {BadRequestError, NotFoundError} = require("../expressError");
const {sqlForPartialUpdate} = require("../helpers/sql");

/** METHODS FOR FOODS */

class Food {
    /** Create a food (from data), update db, return new food data.
   *    Data should be {id, title, category, nutrition, lunch_id}
   *    Returns {id, category, nutrition, lunchId}
   *    Throws BadRequestError if food is already in database.
   * */
  static async create({title, category, nutrition, lunchId}) {
    const duplicateCheck = await db.query(
            `SELECT title
             FROM foods
             WHERE title = $1`,
        [title]);

    if (duplicateCheck.rows=[0]) throw new BadRequestError(`Duplicate food: ${title}`);
    
    const result = await db.query(
                `INSERT INTO foods
                (title, category, nutrition, lunch_id)
                VALUES ($1, $2, $3, $4)
                RETURNING title, category, nutrition, lunch_id AS "lunchId"`,
            [
                title, 
                category, 
                nutrition, 
                lunchId,
            ],
        )
    const food = result.rows[0];
    return food;
  }

  /** Find all foods (option filter on searchFilters)
   *  searchFilters(all optional):
   *  - title (will find case-insensitive, partial matches)
   *  - category
   *  Returns [{id, title, category, nutrition, lunchId}, ...]
   */
  static async findAll(searchFilters = {}) {
    let query = `SELECT id,
                        title,
                        category,
                        nutritions
                        lunch_id AS "lunchId
                 FROM foods`;
    let whereExpressions = [];
    let queryValues = [];

    const {title, category} = searchFilters;

    // For each possible search term, add to whereExpressions and queryValues so
    // we can generate the right SQL

    if (!title) {
        throw new BadRequestError("Title field cannot be empty");
    } else {
        queryValues.push(`%${title}%`);
        whereExpressions.push(`title ILIKE $${queryValues.length}`);
    }

    if (!category) {
        throw new BadRequestError("Category field cannot be empty");
    } else {
        queryValues.push(`%${category}%`);
        whereExpressions.push(`category ILIKE $${queryValues.length}`);
    }

    if (whereExpressions.length > 0) {
        query += " WHERE " + whereExpressions.join(" AND ");
    }

    // Finalize query and return results
    query += "ORDER BY title";
    const foodsRes = await db.query(query, queryValues);
    return foodsRes.rows;
  }

  /** Given a food id, return data about that food
   *  Returns {id, title, category, servingSize, calories, fat, carbohydrates, sugar, lunchId}
   *  Throws NotFoundError if not found
   */
  static async get(id) {
    const foodRes = await db.query(
                `SELECT id,
                        title,
                        category,
                        serving_size AS "servingSize".
                        calories,
                        fat,
                        protein,
                        carbohydrates,
                        sugar,
                        lunch_id AS "lunchId"
                 FROM foods
                 WHERE id = $1`,
            [id]);

    const food  = foodRes.rows[0];

    if (!food) throw new NotFoundError(`No food found: ${id}`);

    return food;
  }

  /** Update food data with 'data
   *  This is a "partial update" --- it's fine if data doesn't contain all the fields;
   *  this only changes provided fields
   *  Data can include: {title, category, serving_size, calories, fat carbohydrates, sugare, lunchId}
   *  Returns {id, title, category, serving_size, calories, fat carbohydrates, sugare, lunchId}
   *  Throws NotFoundError if food is not found
   */
  static async update(id, data) {
    const {setCols, values} = sqlForPartialUpdate(
        data,
        {
            servingSize: "serving_size",
            lunchId: "lunch_id",
        });
    const handleVarIdx = "$" + (values.length + 1);
    const querySql = `UPDATE foods
                      SET ${setCols}
                      WHERE id = ${handleVarIdx}
                      RETURNING id,
                                title,
                                category,
                                serving_size AS "servingSize",
                                calories,
                                fat,
                                protein,
                                carbohydrates,
                                sugar,
                                lunch_id AS "lunchId"`;
    const result = await db.query(querySql, [...values, id]);
    const food = result.rows[0];

    if (!food) throw new NotFoundError(`No food found: ${id}`);

    return food;
  }

  /** Deletes a given food from database; returns undefined
   *  Throws NotFoundError if food is not found
   */
  static async remove(id) {
    const result = await db.query(
            `DELETE
             FROM foods
             WHERE id = $1
             RETURNING id`,
        [id]);
    const food = result.rows[0];
    if (!food) throw new NotFoundError(`No food found: ${id}`);
  }
}

module.exports = Food;