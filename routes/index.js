const express = require("express");
const router = express.Router();
const moment = require("moment");
const Country = require("../models/country");
router.get("/", function (req, res, next) {
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
  Country.find({ short: country, date: { $gt: dateParam } })
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
  Country
    .distinct("name")
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
