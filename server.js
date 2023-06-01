// Server-Side Entry Point For The Tarpaulin API
// ---------------------------------------------

// Imports
import express from "express";
import mongoose from "mongoose";
import dotenev from "dotenv";
import morgan from "morgan";

import api from "./api/index.js"

// Config
dotenev.config();
const app = express();

// Environment Variables
const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV || "development";

const mongoPort = process.env.MONGO_PORT || 27017
const mongoAuthDbName = process.env.MONGO_DBNAME || "tarpaulin"
const mongoUser = process.env.MONGO_USER || "tarpaulin"
const mongoPassword = process.env.MONGO_PASS || "pass"
const mongoHost = process.env.MONGO_HOST || "localhost"

const mongoUrl = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoAuthDbName}`;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// API
app.use("/api", api);

// Test Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('*', function (req, res, next) {
  res.status(404).send({
      err: "This URL was not recognized: " + req.originalUrl
  })
})


// Database Connection
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`[⚡️ DATABASE] Connected to MongoDB`);
  })
  .catch((err) => {
    console.log(`[❌ DATABASE] Error: ${err}`);
  })
  .finally(() => {
    console.log(`[⚡️ SERVER] MongoURI: ${mongoUrl}`);

    // Start Server
    app.listen(port, () => {
      console.log(`[⚡️ SERVER] Server is running on port ${port}`);
    });
  });
