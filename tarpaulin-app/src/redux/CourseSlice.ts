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
            builder.addCase(fetchCourses.rejected, (state) => {
                  state.courses = [];
            });
            builder.addCase(fetchCourses.pending, (state) => {
                  state.courses = [];
            });
            builder.addCase(addNewCourse.fulfilled, (state, action) => {
                  state.courses.push(action.payload);
            });
            builder.addCase(removeCourse.fulfilled, (state, action) => {
                  if (action.payload) {
                        state.courses = state.courses.filter(course => course._id !== action.payload);
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

export default courseSlice.reducer