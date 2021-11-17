const dotenv = require('dotenv').config();
const md5 = require("md5");


const pass = md5(dotenv.parsed.KEY+ new Date().getHours())
const params  = dotenv.parsed

module.exports = {pass, params}