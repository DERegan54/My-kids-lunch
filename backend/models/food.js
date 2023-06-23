"use strict";

const db = require("../db");
const {BadRequestError, NotFoundError} = require("../expressError");
const {sqlForPartialUpdate} = require("../helpers/sql");

/** METHODS FOR FOODS */

class Food {
    /** Create a food (from data), update db, return new food data.
   *    Data should be {title, category, serving_size, calories, fat, protein, carbohydrates, sugar, lunch_id}
   *    Returns {category, servingSize, calories, fat, protein, carbohydrates, sugar, lunchId}
   *    Throws BadRequestError if food is already in database.
   * */
  static async create({title, category, servingSize, calories, fat, protein, carbohydrates, sugar}) {
    // const duplicateCheck = await db.query(
    //         `SELECT title
    //          FROM foods
    //          WHERE title = $1`,
    //     [title]);

    // if (duplicateCheck.rows=[0]) throw new BadRequestError(`Duplicate food: ${title}`);
    
    const result = await db.query(
                `INSERT INTO foods
                (title, category, serving_size, calories, fat, protein, carbohydrates, sugar)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING title, category, serving_size AS "servingSize", calories, fat, protein, carbohydrates, sugar`,
            [
                title, 
                category, 
                servingSize,
                calories,
                fat,
                protein,
                carbohydrates,
                sugar, 
            ],
        )
    const food = result.rows[0];
    return food;
  }

  /** Find all foods (option filter on searchFilters)
   *  searchFilters(all optional):
   *  - title (will find case-insensitive, partial matches)
   *  - category
   *  Returns [{id, title, category, servingSize, calories, fat, protein, carbohydrates, sugar, lunchId}, ...]
   */
  static async findAll(searchFilters = {}) {
    let query = `SELECT id,
                        title,
                        category,
                        serving_size AS "servingSize",
                        calories,
                        fat,
                        protein,
                        carbohydrates,
                        sugar
                 FROM foods`;
    let whereExpressions = [];
    let queryValues = [];

    const {title, category} = searchFilters;

    // For each possible search term, add to whereExpressions and queryValues so
    // we can generate the right SQL

    if (title !== undefined) {
        queryValues.push(`%${title}%`);
        whereExpressions.push(`title ILIKE $${queryValues.length}`);
    }

    if (category !== undefined) {
      queryValues.push(`%${category}%`);
      whereExpressions.push(`category ILIKE $${queryValues.length}`);
    }
    
    if (whereExpressions.length > 0) {
        query += " WHERE " + whereExpressions.join(" AND ");
    }

    // // Finalize query and return results
    query += " ORDER BY title";
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
                        serving_size AS "servingSize",
                        calories,
                        fat,
                        protein,
                        carbohydrates,
                        sugar
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
   *  Data can include: {id, title, category, serving_size, calories, fat carbohydrates, sugare, lunchId}
   *  Returns {id, title, category, serving_size, calories, fat carbohydrates, sugare, lunchId}
   *  Throws NotFoundError if food is not found
   */
  static async update(id, data) {
    const {setCols, values} = sqlForPartialUpdate(
        data,
        {
          servingSize: "serving_size",
        });
    const idVarIdx = "$" + (values.length + 1);
    const querySql = `UPDATE foods
                      SET ${setCols}
                      WHERE id = ${idVarIdx}
                      RETURNING id,
                                title,
                                category,
                                serving_size AS "servingSize",
                                calories,
                                fat,
                                protein,
                                carbohydrates,
                                sugar`
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