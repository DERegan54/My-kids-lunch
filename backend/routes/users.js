"use strict";

const jsonschema = require("jsonschema");

const express = require('express');
const User = require("../models/user");

const router = new express.Router();

/** ROUTES FOR USERS */

/** GET / => { users: [id, username, firstName, lastName, email, diet, allergies, preferences, aversions, favorites}, ... ] 
 *  Returns list of all users */
router.get("/", async function(req, res, next) {
    try {
        const users = await User.findAll();
        return res.json({users});
    } catch (err) {
        return next(err);
    }
});

/** GET /users/[username]: gets a specific user */
router.get("/:username", async function(req, res, next) {
    try {
        const user = await User.get(req.params.username);
        return res.json({user});
    } catch (err) {
        return next(err);
    }
});

/** GET /users/[id]: gets a user's username by id */
router.get("/username/:id", async function (req, res, next) {
    try {
        const username = await User.getUsername(req.params.id);
        return res.json({username});
    } catch (err) {
        return next(err);
    }
});

/** PATCH /[id] { user } => { user }: updates a user */
router.patch("/:id", async function (req, res, next) {
    try {
        const user = await User.update(req.params.id, req.body);
        return res.json({user});
    } catch (err) {
        return next(err);
    }
});

/** DELETE users/[id]: deletes user, return status */
router.delete("/:id", async function (req, res, next) {
    try {
        await User.remove(req.params.id);
        return res.json({deleted: req.params.id});
    } catch (err) {
        return next(err);
    }
});

/** POST users/[username]/lunches/[id] {state} => {favorite} adds a favprotes
 *  returns {"favorited": id}
 */
router.post("/:userId/lunches/:lunchId", async function (req, res, next) {
    try {
        const userId = +req.params.userId;
        const lunchId = +req.params.lunchId;
        await User.addFavorite(userId, lunchId);
        return res.json({favorited: lunchId});
    } catch (err) {
        return next(err);
    }
});


module.exports = router; 