import mongoose from "mongoose";

// Assignment Schema
const assignmentSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
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
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

export default Assignment;