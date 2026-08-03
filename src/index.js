const express = require("express");
const cors = require("cors");
const { run } = require("./config/db");
const userRoutes = require("./routes/Route.user");

const app = express();

// env variables
require("dotenv").config();

const PORT = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json());

// database connection
run();
// routes
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the SnapDeal API 😀😀😀 🚀👩‍🚀");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
