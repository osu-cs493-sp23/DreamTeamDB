import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectCourseById } from '../redux/CourseSlice'
import { RootState } from '../redux/store'
import { Course } from '../types'

// View information about a course
const DetailCourse = () => {
      const { courseId } = useParams();
      const [fields, setFields] = React.useState<any>({});
      const role = localStorage.getItem('role');
      const course = useSelector((state: RootState) => selectCourseById(state, courseId as string))

      return courseId && (
            <>
            

            </>
      )
}

export default DetailCourse
