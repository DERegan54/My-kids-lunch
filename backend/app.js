"use strict";

/** EXPRESS APP FOR My_kids_lunch */

const express = require('express');
const cors = require("cors");

const { NotFoundError } = require("./expressError");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);

app.use(express.json());


/** ERROR HANDLING */

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;
  
    return res.status(status).json({
      error: { message, status },
    });
});

module.exports = app;