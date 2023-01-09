const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("../config/db/setup");
const expressGlobalErrorHandling = require("./utils/errorHandling/express-global-err-handling");


const app = express()

app.use(express.json());
app.use(helmet())
app.use(cors());
app.use(expressGlobalErrorHandling)

module.exports = app;

