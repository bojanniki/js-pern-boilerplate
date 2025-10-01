//Database connection
const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool();

//export the pool so other files can use it to run SQL queries
