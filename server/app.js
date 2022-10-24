const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use(require("./routes/routes"));

module.exports = app;
