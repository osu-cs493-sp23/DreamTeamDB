// Server-Side Entry Point For The Tarpaulin API
// ---------------------------------------------

// Imports
import express from "express";
import mongoose from "mongoose";
import dotenev from "dotenv";
import morgan from "morgan";
import cors from "cors";
import RedisStore from "rate-limit-redis";
import rateLimit from "express-rate-limit";
import redis from "redis";
import { rateLimitM } from "./lib/auth.js";

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
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
})

// Create a rate limiter middleware
export const limiterUnauthenticated = rateLimit({
  windowMs: 60 * 1000,  // 1 minute
  max: 10,              // for requests made without a valid authentication token, the API permits 10 requests per minute
  standardHeaders: true,
  message: "Unauthenticated requests are limited to 10 per minute.",
  store: new RedisStore({
    sendCommand: (...args) => {
      return client.sendCommand(...args);
    }
  })
});

export const limiterAuthenticated = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30,              // for requests made with a valid authentication token, the API permits 30 requests per minute
  standardHeaders: true,
  message: "Authenticated requests are limited to 30 per minute.",
  store: new RedisStore({
    sendCommand: (...args) => {
      return client.sendCommand(...args);
    }
  })
});

async function connectToRedis() {
  try {
    await redisClient.connect();
    // console.log("Redis client connected");
  } catch (err) {
    console.log("Redis error: ", err);
  }
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors())
app.use(rateLimitM)

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
  .connect(mongoConnectionString, {
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
    // Start Server
    app.listen(port, () => {
      console.log(`[⚡️ SERVER] Server is running on port ${port}`);
    });
  });

connectToRedis()
  .then(() => {
    console.log(`[⚡️ SERVER] Redis is running on port ${process.env.REDIS_PORT}`);
  })
  .catch((err) => {
    console.log("Error connecting to Redis: ", err);
  });

/*
 * This route will catch any errors thrown from our API endpoints and return
 * a response with a 500 status to the client.
 */
app.use("*", function (err, req, res, next) {
  if (err) {
    console.error(err);
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
