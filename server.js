var express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const logger = require("./middleware/logger.js");
// const errorHandler = require("./middleware/error.js");
const connectDb = require("./config/db.js");
const colors = require("colors");
//var bodyParser = require('body-parser');

var user = require("./routes/user.js");
var auth = require("./routes/auth.js");
var contact = require("./routes/contact.js");

// dotenv.config({
//   path: "./config/config.env",
// });

//Connect with database
connectDb();

// const PORT = process.env.PORT || 5000;
const PORT = 5000;

var app = express();
app.use(express.json());
app.use(logger);

//using bodyparser

//Mount the routes for
app.use("/api/user", user);
app.use("/api", auth);
app.use("/api/contacts", contact);
//app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  console.log("in production");
  app.use(express.static("/client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "public", "index.html"))
  );
}

const server = app.listen(
  PORT,
  console.log(
    `Server running ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, message) => {
  console.log(`Error: ${err.message}`.red.bold);
  //Close server and exit process
  server.close(() => process.exit(1));
});
