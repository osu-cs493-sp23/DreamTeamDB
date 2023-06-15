import mongoose from "mongoose";

// Assignment Schema
const assignmentSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  due: {
    type: Date,
    required: true,
  },
  submissions: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    unique: false,
  },
});

export default assignmentSchema;