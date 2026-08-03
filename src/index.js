const express = require("express");
const cors = require("cors");
const { run } = require("./config/db");

const app = express();

const PORT = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json());

// env variables
require("dotenv").config();

// database connection
run();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
