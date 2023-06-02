import React from 'react'
import { courses } from '../data/courses'
import { assignments } from '../data/assignments'
import { submissions } from '../data/submissions'
import { users } from '../data/users'


const useData = () => {

      const [coursesList, setCourses] = React.useState(courses);

      const getCourses = () => {
            return courses;
      }

      const removeCourse = (title: string) => {
            const newCourses = coursesList.filter(course => course.title !== title);
            return newCourses;
      }

      const getAssignments = () => {
            return assignments;
      }

      const getSubmissions = () => {
            return submissions;
      }

      const getUsers = () => {
            return users;
      }

      const getCoursesByInstructor = (instructorId: string) => {
            return courses.filter(course => course.instructorId === instructorId);
      }

      const getAssignmentsByCourse = (courseId: string) => {
            return assignments.filter(assignment => assignment.courseId === courseId);
      }

      const getSubmissionsByAssignment = (assignmentId: string) => {
            return submissions.filter(submission => submission.assignmentId === assignmentId);
      }

      const getSubmissionsByStudent = (studentId: string) => {
            return submissions.filter(submission => submission.studentId === studentId);
      }


      return { getCourses, getAssignments, getSubmissions, getUsers, getCoursesByInstructor, getAssignmentsByCourse, getSubmissionsByAssignment, getSubmissionsByStudent, removeCourse }
}

export default useData
