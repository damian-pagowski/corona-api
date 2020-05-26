require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const indexRouter = require("./routes/index");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// rate limit
const rateLimit = require("express-rate-limit");
app.set("trust proxy", 1);
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 1000, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// cors
app.use(cors());

// helmet
app.use(helmet());

// routes
app.use("/", indexRouter);

// db connection
const DB_URI = process.env.MONGOLAB_URI;
console.log(`Connecting to database:  ${DB_URI}`);
mongoose.set("useFindAndModify", false);
mongoose
  .connect(DB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .catch((error) => console.log(error));
// run server
const SERVER_PORT = process.env.PORT || 3030;
app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));
module.exports = app;
