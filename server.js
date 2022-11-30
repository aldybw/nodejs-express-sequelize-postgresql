require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");

const app = express();

var corsOptions = {
  origin: "http://localhost:8080",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the node application" });
});

require("./app/routes/tutorial.routes")(app);
require("./app/routes/comment.routes")(app);
require("./app/routes/tag.routes")(app);

// set port
const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  try {
    // testing the connection
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // synchronizing all models at once
    await db.sequelize.sync();
    console.log("All models were synchronized successfully.");

    console.log(
      `Server is running on port ${PORT}, access this on http://localhost:${PORT}`
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
