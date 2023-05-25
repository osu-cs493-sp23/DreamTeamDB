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

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {
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
    console.log(`[⚡️ SERVER] MongoURI: ${process.env.MONGO_URI}`);

    // Start Server
    app.listen(port, () => {
      console.log(`[⚡️ SERVER] Server is running on port ${port}`);
    });
  });
