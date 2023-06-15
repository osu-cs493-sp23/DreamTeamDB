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

export const addNewCourse = createAsyncThunk(
      'course/addNewCourse',
      async (course: Course) => {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8000/api/courses', {
                  course,
            }, {
                  headers: { Authorization: `Bearer ${token}` },
            });
            const courseToAdd: Course = {
                  _id: response.data.course.id,
                  instructorId: response.data.course.instructorId,
                  subject: response.data.course.subject,
                  number: response.data.course.number,
                  title: response.data.course.title,
                  term: response.data.course.term,
            }
            return courseToAdd;
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
            builder.addCase(addNewCourse.rejected, (state) => {
                  state.courses = [];
            });
            builder.addCase(addNewCourse.pending, (state) => {
                  state.courses = [];
            });
      }

})

// Action creators are generated for each case reducer function
export const { setCourses, deleteCourse } = courseSlice.actions

export const selectCourses = (state: { course: CourseState }) => state.course.courses;

export default courseSlice.reducer