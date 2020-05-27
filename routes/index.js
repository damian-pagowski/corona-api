const express = require("express");
const router = express.Router();
const moment = require("moment");
const Country = require("../models/country");
router.get("/", function (req, res, next) {
  res.json({ status: "up" });
});

router.get("/countries/:country", (req, res, next) => {
  //   params
  const dateParam = req.query.date;
  const { country } = req.params;

  const date = dateParam
    ? moment("2005-07-08", "YYYY-MM-DD", true).toDate()
    : new Date();
  date.setHours(0, 0, 0, 0);

  //   log - debug
  console.log("DATE: " + date + " COUNTRY: " + country);
  //    db
  Country.find({ short: country, date: { $gt: date } })
    .then((result) => res.json(result))
    .catch((error) => next(error));
});

router.get("/list/countries", (req, res, next) => {
  Country.find()
    .distinct('country')
    .then((result) => res.json(result))
    .catch((error) => next(error));
});

router.post("/countries", (req, res, next) => {
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
