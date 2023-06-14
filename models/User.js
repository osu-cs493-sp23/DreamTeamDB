import mongoose from 'mongoose';
import joi from 'joi';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'instructor', 'student'],
    default: 'student',
  },
});

export const validateUser = (user) => {
  const schema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    role: joi.string().valid('admin', 'instructor', 'student'),
  });

  return schema.validate(user);
};

export const validateLogin = (user) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

  return schema.validate(user);
};

export default userSchema;

const User = mongoose.model('User', userSchema);

// Get user by ID
export async function getUserById(id) {
  try {
    return await User.findById(id);
  } catch (err) {
    console.error("  -- error:", err);
    return null;
  }
}

//  Get all students array of objectids
export async function getStudents() {
  try {
    return await User.find({ role: "student" });
  } catch (err) {
    console.error("  -- error:", err);
    return null;
  }
}