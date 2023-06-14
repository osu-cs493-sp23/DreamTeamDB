import mongoose from "mongoose";
import { Assignment } from "./index.js";

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
  assignments: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  students: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
});

export default courseSchema;

const Course = mongoose.model("Course", courseSchema);

// CREATE
export async function createCourse(fields) {
  try {
    let existingCourse = await Course.findOne({
      subject: fields.subject,
      number: fields.number,
      term: fields.term,
    });

    if (existingCourse) {
      return { error: "Course already exists." }
    }

    const course = new Course(fields);
    await course.save();
    return course._id;
  } catch (err) {
    console.error("  -- error:", err);
    return null;
  }
}

// READ
export async function getCourse(id) {
  /* 
  * Excluding the list of students enrolled in the course
  * and the list of Assignments for the course.
  */
  try {
    const course = await Course.findById(id);
    let courseObj = course.toObject();
    delete courseObj.students;
    delete courseObj.assignments;
    return courseObj;
  } catch (err) {
    console.error("  -- error:", err);
    return null;
  }
}

// UPDATE
export async function updateCourse(id, fields) {
  try {
    const course = await Course.findById(id);
    if (fields.assignments || fields.students) {
      return false;
    }
    course.set(fields);
    await course.save();
    return true;
  } catch (err) {
    console.error("  -- error:", err);
    return false;
  }
}

// DELETE
export async function deleteCourse(id) {
  try {
    await Course.findByIdAndDelete(id);
    return true;
  } catch (err) {
    console.error("  -- error:", err);
    return false;
  }
}

// Get all courses
export async function getCourses(page = 1, subject = null, number = null, term = null) {
  try {
    page = parseInt(page);
    // dont include students and assignments
    const courses = await Course.find({
      ...(subject ? { subject } : {}),
      ...(number ? { number } : {}),
      ...(term ? { term } : {}),
    })
      .limit(10)
      .skip((page - 1) * 10)
      .sort({ subject: 1, number: 1, term: 1 })
      .select("-students -assignments");

    const totalCourses = await Course.countDocuments({
      ...(subject ? { subject } : {}),
      ...(number ? { number } : {}),
      ...(term ? { term } : {}),
    });

    return {
      courses,
      totalPages: Math.ceil(totalCourses / 10),
      currentPage: page,
      pageSize: 10,
      totalCount: totalCourses,
      links: {
        next: `/api/courses?page=${page + 1}`,
        prev: `${page > 1 ? `/api/courses?page=${page - 1}` : "None"}`,
        last: `/api/courses?page=${Math.ceil(totalCourses / 10)}`,
      },
    };

  } catch (err) {
    console.error("  -- error:", err);
    return null;
  }
}

// Get assignments for a course
export async function getAssignmentsForCourse(id) {
  try {
    const course = await Course.findById(id);
    const assignments = await Assignment.find({ _id: { $in: course.assignments } });
    console.log(assignments);
    return assignments;
  } catch (err) {
    console.error("  -- error:", err);
    return null;
  }
}