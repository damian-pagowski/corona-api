const express = require("express");
const router = express.Router();
const moment = require("moment");
const Country = require("../models/country");
require("dotenv").config();

const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    console.log("USER: " + user)
    next();
  });
}

router.get("/", authenticateToken, (req, res, next) => {
  res.json({ status: "up" });
});

router.get("/countries/:country", (req, res, next) => {
  //   params
  const { date, latest_only } = req.query;
  const { country } = req.params;

  const dateParam = date
    ? moment(date, "YYYY-MM-DD", true).toDate()
    : new Date();
  dateParam.setHours(0, 0, 0, 0);

  //   log - debug
  console.log("DATE: " + dateParam + " COUNTRY: " + country);
  //    db

  const conditions  = { short: country }
  if (date){
    conditions.date =  { $gt: dateParam }
  }
  Country.find(conditions)
    .then((result) =>
      res.json(
        latest_only
          ? result.length > 0
            ? result[result.length - 1]
            : {}
          : result
      )
    )
    .catch((error) => next(error));
});

router.get("/list/countries", (req, res, next) => {
  Country.distinct("name")
    .then((result) => res.json(result))
    .catch((error) => next(error));
});

router.post("/countries", authenticateToken, (req, res, next) => {
  // params
  const date = Date.now();
  const country = new Country({ ...req.body, date });
  // log for debug
  console.log(JSON.stringify(country));
  //  db
  country
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => next(error));
});
module.exports = router;

// GENERATE TOKEN

// function generateAccessToken(username) {
//   return jwt.sign(username, process.env.TOKEN_SECRET);
// }

// console.log(generateAccessToken('scraper'));