const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const countrySchema = new Schema({
    name: { type: String, required: true },
    short: { type: String, required: true },
    totalCases: { type: Number, required: false },
    newCases: { type: Number, required: false },
    totalDeaths: { type: Number, required: false },
    newDeaths: { type: Number, required: false },
    totalRecovered: { type: Number, required: false },
    date: { type: Date, required: true },
});

module.exports = mongoose.model("Country", countrySchema);