import {
      PayloadAction,
      createAsyncThunk,
      createSlice
} from '@reduxjs/toolkit';
import axios from 'axios';
import { Course } from '../types';

export interface CourseState {
      courses: Course[];
}

const initialState: CourseState = {
      courses: [],
}

export const fetchCourses = createAsyncThunk(
      'course/fetchCourses',
      async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8000/api/courses', {
                  params: { page: 1, subject: '', number: '', term: '' },
                  headers: { Authorization: `Bearer ${token}` },
            });
            return response.data.courses;
      }
)

interface AddNewCourse {
      title: string,
      subject: string,
      number: string,
      term: string,
      instructorId: string,
}

export const addNewCourse = createAsyncThunk(
      'course/addNewCourse',
      async ({ title, subject, number, term, instructorId }: AddNewCourse) => {
            const token = localStorage.getItem('token');
            try {
                  const response = await axios.post('http://localhost:8000/api/courses', {
                        title,
                        subject,
                        number,
                        term,
                        instructorId,
                  }, {
                        headers: { Authorization: `Bearer ${token}` },
                  });
                  return response.data.course;
            } catch (error) {
                  console.log(error);
                  return error;
            }
      }
)

interface RemoveCourse {
      courseId: string,
}

export const removeCourse = createAsyncThunk(
      'course/removeCourse',
      async ({ courseId }: RemoveCourse) => {
            const token = localStorage.getItem('token');
            try {
                  const response = await axios.delete(`http://localhost:8000/api/courses/${courseId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                  });
                  if (response.status === 204) {
                        return courseId;
                  } else {
                        return false;
                  }
            } catch (error) {
                  console.log(error);
                  return false;
            }
      }
)

interface GetAssignments {
      courseId: string,
}

export const getAssignments = createAsyncThunk(
      'course/getAssignments',
      async ({ courseId }: GetAssignments) => {
            const token = localStorage.getItem('token');
            try {
                  const response = await axios.get(`http://localhost:8000/api/courses/${courseId}/assignments`, {
                        headers: { Authorization: `Bearer ${token}` },
                  });
                  return response.data.assignments;
            } catch (error) {
                  console.log(error);
                  return false;
            }
      }
)

interface RemoveAssignment {
      assignmentId: string,
}

export const removeAssignment = createAsyncThunk(
      'course/removeAssignment',
      async ({ assignmentId }: RemoveAssignment) => {
            const token = localStorage.getItem('token');
            try {
                  const response = await axios.delete(`http://localhost:8000/api/assignments/${assignmentId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                  });
                  if (response.status === 204) {
                        return assignmentId;
                  } else {
                        return false;
                  }
            } catch (error) {
                  console.log(error);
                  return false;
            }
      }
)

interface CreateAssignment {
      courseId: string,
      title: string,
      points: number,
      due: Date,
}

export const createAssignment = createAsyncThunk(
      'course/createAssignment',
      async ({ courseId, title, points, due }: CreateAssignment) => {
            const token = localStorage.getItem('token');
            try {
                  const response = await axios.post(`http://localhost:8000/api/assignments`, {
                        courseId,
                        title,
                        points,
                        due,
                  }, {
                        headers: { Authorization: `Bearer ${token}` },
                  });
                  return response.data.assignment;
            } catch (error) {
                  console.log(error);
                  return false;
            }
      }
)

interface GetStudentsInCourse {
      courseId: string,
}

export const getStudentsInCourse = createAsyncThunk(
      'course/getStudentsInCourse',
      async ({ courseId }: GetStudentsInCourse) => {
            const token = localStorage.getItem('token');
            try {
                  const response = await axios.get(`http://localhost:8000/api/courses/${courseId}/students`, {
                        headers: { Authorization: `Bearer ${token}` },
                  });
                  return response.data.students;
            } catch (error) {
                  console.log(error);
                  return false;
            }
      }
)


export const courseSlice = createSlice({
      name: 'course',
      initialState,
      reducers: {
            setCourses: (state, action: PayloadAction<Course[]>) => {
                  state.courses = action.payload;
            },
            deleteCourse: (state, action: PayloadAction<string>) => {
                  state.courses = state.courses.filter(course => course._id !== action.payload);
            },

      },
      extraReducers: (builder) => {
            builder.addCase(fetchCourses.fulfilled, (state, action) => {
                  state.courses = action.payload;
            })
            builder.addCase(addNewCourse.fulfilled, (state, action) => {
                  state.courses.push(action.payload);
            });
            builder.addCase(removeCourse.fulfilled, (state, action) => {
                  if (action.payload) {
                        state.courses = state.courses.filter(course => course._id !== action.payload);
                  }
            });
            builder.addCase(getAssignments.fulfilled, (state, action) => {
                  const course = state.courses.find(course => course._id === action.meta.arg.courseId);
                  if (course) {
                        state.courses = state.courses.map(course => {
                              if (course._id === action.meta.arg.courseId) {
                                    return { ...course, assignments: action.payload }
                              } else {
                                    return course;
                              }
                        }
                        );
                  }
            });
            builder.addCase(removeAssignment.fulfilled, (state, action) => {
                  if (action.payload) {
                        state.courses = state.courses.map(course => {
                              if (course.assignments) {
                                    return {
                                          ...course,
                                          assignments: course.assignments.filter(assignment => assignment._id !== action.payload)
                                    }
                              } else {
                                    return course;
                              }
                        });
                  }
            });
            builder.addCase(createAssignment.fulfilled, (state, action) => {
                  if (action.payload) {
                        state.courses = state.courses.map(course => {
                              if (course._id === action.payload.courseId) {
                                    if (course.assignments) {
                                          return {
                                                ...course,
                                                assignments: [...course.assignments, action.payload]
                                          }
                                    } else {
                                          return {
                                                ...course,
                                                assignments: [action.payload]
                                          }
                                    }
                              } else {
                                    return course;
                              }
                        });
                  }
            });
            builder.addCase(getStudentsInCourse.fulfilled, (state, action) => {
                  const course = state.courses.find(course => course._id === action.meta.arg.courseId);
                  if (course) {
                        state.courses = state.courses.map(course => {
                              if (course._id === action.meta.arg.courseId) {
                                    return { ...course, students: action.payload }
                              } else {
                                    return course;
                              }
                        }
                        );
                  }
            });
      }

})

// Action creators are generated for each case reducer function
export const { setCourses, deleteCourse } = courseSlice.actions

export const selectCourses = (state: { course: CourseState }) => state.course.courses;

export const selectCourseById = (state: { course: CourseState }, courseId: string) => {
      return state.course.courses.find(course => course._id === courseId);
}

export const selectCourseAssignments = (state: { course: CourseState }, courseId: string) => {
      return state.course.courses.find(course => course._id === courseId)?.assignments;
}

export const selectStudentsInCourse = (state: { course: CourseState }, courseId: string) => {
      return state.course.courses.find(course => course._id === courseId)?.students;
}



export default courseSlice.reducer