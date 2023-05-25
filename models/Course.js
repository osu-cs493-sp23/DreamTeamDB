import mongoose from "mongoose";

// Course Schema
const courseSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  term: {
    type: String,
    required: true,
  },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

export default courseSchema;
