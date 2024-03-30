const express = require("express");
const session = require("express-session");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const passport = require("passport");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
require("dotenv").config();

const { newsRouter, authRouter } = require("./routes/api");
const { sessionConfig } = require("./configs");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(passport.initialize());
app.use(session(sessionConfig));
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});

app.use("/api/news", newsRouter);
app.use("/api/auth", authRouter);
app.use("/api/link", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
}); // Temp to del
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/service", (req, res) => {
  res.status(200).json({
    code: 200,
    message: "Status OK. Keep working...",
  });
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
