const bcrypt = require("bcrypt");

const db = require("../db.js");
const {BCRYPT_WORK_FACTOR} = require("../config");

async function commonBeforeAll() {
    await db.query("DELETE FROM lunches");
    await db.query("DELETE FROM  users");
    await db.query("DELETE FROM foods");
}