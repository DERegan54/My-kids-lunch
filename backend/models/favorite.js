"use strict";

const db = require("../db")
const {NotFoundError} = require("../expressError");

/** METHODS FOR FAVORITES */

class Favorite {

    /** Creates a favorite (from data), update db, return new favorite data 
     *  Data should include {user_id, lunchId} 
    */
    static async create({userId, lunchId}) {
        const result = await db.query(
                `INSERT INTO favorites
                 (user_id, lunch_id)
                 VALUES ($1, $2)
                 RETURNING username, lunch_id AS "lunchId"`
            [
                userId,
                lunchId
            ],
        );
        const favorite = result.rows[0];
        return favorite;
    }

    /** FindAll favorites 
     *  Finds all favorites associated with a user
     *  Returns [{id, userId, lunchId}, ...]
    */
    static async findAll() {
        let query = `SELECT f.id,
                            f.username,
                            f.lunch_Id AS "lunchId"
                     FROM favorites f
                        LEFT JOIN users AS u ON u.username = f.username`;
        
        query += " ORDER BY username";
        const favoritesRes = await db.query(query);
        return favoritesRes.rows;
    }

    /** Delete given favorite from database; returns undefined
     *  Throws NotFoundError if favorite not found
     */
    static async remove(id) {
        const result = await db.query(
                `DELETE
                 FROM favorites
                 WHERE id = $1
                 RETURNING id`, 
            [id]);
        const favorite  = result.rows[0];
        
        if (!favorite) throw new NotFoundError(`No favorite found :${id}`);
    }

}

module.exports = Favorite;