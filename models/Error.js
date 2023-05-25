import mongoose from "mongoose";

// Error Schema
// Do we really need a schema for this? 0.o
const errorSchema = new mongoose.Schema({
  error: {
    type: String,
    required: true,
  },
});

export default errorSchema;
