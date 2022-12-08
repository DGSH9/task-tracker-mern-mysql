var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./src/routes/index");
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.all("*", (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, GET, PUT,PATCH, DELETE");
  res.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, content-type"
  );
  if ("OPTIONS" === req.method) return res.status(200).send();
  next();
});

app.use("/", indexRouter);

app.use(function (req, res, next) {
  res.status(404).send({ error: "Not found" });
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500).send({ error: err });
});

module.exports = app;
