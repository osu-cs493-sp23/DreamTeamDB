import Joi from "joi";

export const assignmentSchema = Joi.object({
  courseId: Joi.string().min(1).required(),
  title: Joi.string().min(1).required(),
  points: Joi.number().integer().min(0).required(),
  due: Joi.date().required()
});

export const courseSchema = Joi.object({
  subject: Joi.string().min(1).required(),
  number: Joi.number().min(1).required(),
  title: Joi.string().min(1).required(),
  term: Joi.string().min(1).required(),
  instructorId: Joi.string().min(1).required()
});

export const submissionSchema = Joi.object({
  assignmentId: Joi.string().min(1).required(),
  studentId: Joi.string().min(1).required(),
  timestamp: Joi.date().timestamp().required(),
  grade: Joi.number().min(0),
  file: Joi.string().min(1),
});

export const userSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(5).required(),
  role: Joi.string().min(1)
});