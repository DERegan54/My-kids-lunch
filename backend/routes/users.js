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

/** POST /[username]/lunches/[id] {state} => {favorite}
 *  returns {"favorited": id}
 */
router.post("/:username/lunches/:id", async function (req, res, next) {
    try {
        const lunchId = +req.params.id;
        await User.addFavorite(req.params.username, lunchId);
        return res.json({favorited: lunchId});
    } catch (err) {
        return next(err);
    }
});


module.exports = router; 