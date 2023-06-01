// Server-Side Entry Point For The Tarpaulin API
// ---------------------------------------------

// Imports
import express from "express";
import mongoose from "mongoose";
import dotenev from "dotenv";
import morgan from "morgan";
import cors from "cors";

import api from "./api/index.js";

// Config
dotenev.config({
  path: "./.env.local",
});

// Express App
const app = express();

// Environment Variables
const port = process.env.PORT || 8000;
const env = process.env.NODE_ENV || "development";
const mongoHost = process.env.MONGO_HOST || "localhost";
const mongoPort = process.env.MONGO_PORT || 27017;
const mongoDatabase = process.env.MONGO_DBNAME || "tarpaulin";
const mongoUser = process.env.MONGO_USER || "admin";
const mongoPassword = process.env.MONGO_PASS || "admin";
const mongoConnectionString = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDatabase}`;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors())

// API
app.use("/api", api);

// Test Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Database Connection
mongoose
  .connect(mongoConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`[⚡️ DATABASE] Connected to MongoDB`);
  })
  .catch((err) => {
    console.log(`[⚡️ DATABASE] Error: ${err}`);
  })
  .finally(() => {
    // Start Server
    app.listen(port, () => {
      console.log(`[⚡️ SERVER] Server is running on port ${port}`);
    });
  });

app.use("*", function (err, req, res, next) {
  if (err) {
    console.error(err.stack);
    res.status(500).send({
      err: err,
    });
  } else {
    next();
  }
});

app.use("*", function (req, res, next) {
  res.status(404).json({
    error: "Requested resource " + req.originalUrl + " does not exist",
  });
});
