const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const port = 1111;

//Middeware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Request-Method", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../build")));

app.get("/reset-pass", (req, res) =>
  res.sendFile(path.join(__dirname + "/routes/html/forgotPass.html"))
);

app.get("/*", (req, res) =>
  res.sendFile(path.join(__dirname, "../build/index.html"))
);

const uri = "mongodb://127.0.0.1/sooti";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const accounts = require("./routes/accounts");
const slides = require("./routes/slides");
const inventory = require("./routes/inventory");
const misc = require("./routes/misc");
const mail = require("./routes/mail");
const transactions = require("./routes/transactions");
const newsletter = require("./routes/newsletter");

app.use("/api/accounts", accounts.router);
app.use("/api/slides", slides.router);
app.use("/api/inventory", inventory.router);
app.use("/api/misc", misc.router);
app.use("/api/mail", mail.router);
app.use("/api/transactions", transactions.router);
app.use("/api/newsletter", newsletter.router);
//console.log(typeof accounts.addTransactionToAccount);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
