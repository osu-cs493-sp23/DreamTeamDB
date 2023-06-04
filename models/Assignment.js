import mongoose from "mongoose";
import Joi from "joi";

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

export const validateAssignment = (user) => {
  const schema = Joi.object({
    courseId: Joi.string().required(),
  });

  return schema.validate(user); 
};

export default assignmentSchema;