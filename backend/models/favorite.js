"use strict";

const db = require("../db")
const {NotFoundError} = require("../expressError");
const {sqlForPartialUpdate} = require("../helpers/sql");

/** METHODS FOR FAVORITES */

class Favorite {

    /** Creates a favorite (from data), update db, return new favorite data 
     *  Data should include {userId, lunchId, isFavorite} 
    */
    static async create(data) {
        let {userId, lunchId} = data;

        // const duplicateCheck = await db.query(
        //         `SELECT user_id AS "userId"
        //          FROM favorites
        //          WHERE lunch_id = lunchId`,
        //     [lunchId],
        // );

        // if (duplicateCheck.rows.contains(userId)) {
        //     throw new BadRequestError(`Duplicate userId, lunchId combination`)
        // }

        // let userFavorites = this.findAllFavoritesOnUser(userId)
        // if (userFavorites.contains(lunchId)) throw new BadRequestError(`Duplicate userId, lunchId combination`)


        const result = await db.query(
                `INSERT INTO favorites (
                        user_id, 
                        lunch_id,
                        is_favorite)
                 VALUES ($1, $2, $3)
                 RETURNING id, user_id AS "userId", lunch_id AS "lunchId", is_favorite AS "isFavorite"`,
            [
                data.userId,
                data.lunchId,
                data.isFavorite,
            ]);
        const favorite = result.rows[0];
        return favorite;
    }

    /** FindAll favorites 
     *  Finds all favorites
     *  Returns [{id, userId, lunchId}, ...]
    */
    static async findAll() {
        let result = await db.query(
                `SELECT id,
                        user_id AS "userId",
                        lunch_id AS "lunchId",
                        is_favorite AS "isFavorite"
                FROM favorites
                ORDER BY id`,
        );
       
        return result.rows;
    }

    /** Gets all favorites associated with a lunch */
    static async findAllFavoritesOnLunch(lunchId) {
        let res = await db.query(
                `SELECT user_id AS "userId",
                        is_favorite AS "isFavorite"
                     FROM favorites 
                     WHERE lunch_id = $1`,
                [lunchId]);
        const favorites = res.rows;
        return favorites;
    }

    /** Gets all favorites associated with a user */
    static async findAllFavoritesOnUser(userId) {
        let res = await db.query(
                `SELECT id,
                        lunch_id AS "lunchId",
                        is_favorite AS "isFavorite"
                     FROM favorites 
                     WHERE user_id = $1`,
                [userId]);
        const favorites = res.rows;
        return favorites;
    }


    /** Gets all  */
    /** Updates favorite with `data 
     *  Data can include: 
     *      {userId, lunchId, isFavorite}
     *  Returns {id, userId, lunchId, isFavorite}
     *  Throws NotFoundError if not found
    */
    static async updateFavorite(id, data) {
        const {setCols, values} = sqlForPartialUpdate(
            data,
            {   
                lunchId: "lunch_id",
                userId: "user_id",
                isFavorite: "is_favorite",
            });
        const idVarIdx = "$" + (values.length + 1);

        const querySql = `UPDATE favorites
                          SET ${setCols}
                          WHERE id = ${idVarIdx}
                          RETURNING id,
                                    user_id AS "userId",
                                    lunch_id AS "lunchId",
                                    is_favorite AS "isFavorite"`;
        const result = await db.query(querySql, [...values, id]);
        const favorite = result.rows[0];

        if (!favorite) throw new NotFoundError(`No favorite: ${id}`);


        return favorite;
    }

    /** Delete given favorite from database; returns undefined
     *  Throws NotFoundError if favorite not found
     */
    static async removeFavorite(id) {
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