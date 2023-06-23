"use strict";

const db = require("../db");
const {BadRequestError, NotFoundError} = require("../expressError");
const {sqlForPartialUpdate} = require("../helpers/sql");

/** METHODS FOR LUNCHES */

class Lunch {
    /** Creates a lunch (from data), update db, return new lunch data
     *  Data should be {id, title, protein, carb, fruit, vegetable, fat, sweet, beverage, userId}
     *  Throws BadRequestError if lunch already in database
     */
    static async create ({title, protein, carb, fruit, vegetable, fat, sweet, beverage, userId}) {
        // const duplicateCheck = await db.query(
        //         `SELECT title
        //          FROM lunches
        //          WHERE title = $1`,
        //     {title});

        // if (duplicateCheck.rows[0])
        //     throw new BadRequestError(`Duplicate lunch: ${title}`);
        
        const result = await db.query(
                `INSERT INTO lunches
                 (title, protein, carb, fruit, vegetable, fat, sweet, beverage, user_id)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                 RETURNING id, title, protein, carb, fruit, vegetable, fat, sweet, beverage, user_id AS "userId"`,
            [
                title, 
                protein,
                carb,
                fruit,
                vegetable,
                fat,
                sweet, 
                beverage, 
                userId,
            ],
        );
        const lunch = result.rows[0];
        
        return lunch;
    }

    /** Find all lunches (optinoal filter on searchFilters) 
     *  searchFilters (all optional): title, protein, carb, fruit, vegetable, fat, sweet, beverage, userId (will find case-insensitive, partial matches)
     *  Returns [{id, title, protein, carb, fruit, vegetable, fat, sweet, beverage}, ...]
    */
    static async findAll(searchFilters = {}) {
        let query = `SELECT id,
                            title,
                            protein,
                            carb,
                            fruit,
                            vegetable,
                            fat,
                            sweet,
                            beverage, 
                            user_id AS "userId"
                     FROM lunches`;
        let whereExpressions = [];
        let queryValues = [];

        const {title, protein, carb, fruit, vegetable, fat, sweet, beverage} = searchFilters;

        if (title !== undefined) {
            queryValues.push(title);
            whereExpressions.push(`title ILIKE $${queryValues.length}`);
        }

        if (protein !== undefined) {
            queryValues.push(protein);
            whereExpressions.push(`protein ILIKE $${queryValues.length}`);
        }

        if (carb !== undefined) {
            queryValues.push(carb);
            whereExpressions.push(`carb ILIKE $${queryValues.length}`);
        }

        if (fruit !== undefined) {
            queryValues.push(fruit);
            whereExpressions.push(`fruit ILIKE $${queryValues.length}`);
        }

        if (vegetable !== undefined) {
            queryValues.push(vegetable);
            whereExpressions.push(`vegetable ILIKE $${queryValues.length}`);
        }

        if (fat !== undefined) {
            queryValues.push(fat);
            whereExpressions.push(`fat ILIKE $${queryValues.length}`);
        }

        if (sweet !== undefined) {
            queryValues.push(sweet);
            whereExpressions.push(`sweet ILIKE $${queryValues.length}`);
        }

        if (beverage !== undefined) {
            queryValues.push(beverage);
            whereExpressions.push(`beverage ILIKE $${queryValues.length}`);
        }

        if (whereExpressions.length > 0) {
            query += " WHERE " + whereExpressions.join(" AND ");
        }

        // Finalize query and return results

        query += " ORDER BY title";
        const lunchesRes = await db.query(query, queryValues);
        return lunchesRes.rows;
    }

    /** Given a lunch id, return data about lunch.
   *
   * Returns [{id, title, protein, carb, fruit, vegetable, fat, sweet, beverage}, ...]
   * Throws NotFoundError if lunch not found.
   **/

  static async get(id) {
    const lunchRes = await db.query(
          `SELECT id,
                  title,
                  protein,
                  carb, 
                  fruit,
                  vegetable, 
                  fat, 
                  sweet,
                  beverage
           FROM lunches
           WHERE id = $1`,
        [id]);

    const lunch = lunchRes.rows[0];

    if (!lunch) throw new NotFoundError(`No lunch found: ${id}`);

    return lunch;
  }

    /** Update lunch data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   * Data can include: {id, title, protein, carb, fruit, vegetable, fat, sweet, beverage}
   * Returns [{id, title, protein, carb, fruit, vegetable, fat, sweet, beverage}, ...]
   * Throws NotFoundError if lunch not found.
   */

    static async update(id, data) {
        const { setCols, values } = sqlForPartialUpdate(data, {});
        
        const idVarIdx = "$" + (values.length + 1);
        const querySql = `UPDATE lunches 
                          SET ${setCols} 
                          WHERE id = ${idVarIdx} 
                          RETURNING id,
                                    title,
                                    protein,
                                    carb,
                                    fruit,
                                    vegetable,
                                    fat,
                                    sweet,
                                    beverage`
        const result = await db.query(querySql, [...values, id]);
        const lunch = result.rows[0];
    
        if (!lunch) throw new NotFoundError(`No lunch found: ${id}`);
    
        return lunch;
      }
    
      /** Delete given lunch from database; returns undefined.
       * Throws NotFoundError if lunch not found.
       **/
    static async remove(id) {
        const result = await db.query(
              `DELETE
               FROM lunches
               WHERE id = $1
               RETURNING id`,
            [id]);
        const lunch = result.rows[0];
    
        if (!lunch) throw new NotFoundError(`No lunch found: ${id}`);
    }

}

module.exports = Lunch;