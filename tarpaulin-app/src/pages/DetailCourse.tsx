import { Container, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectCourseById } from '../redux/CourseSlice'
import { RootState } from '../redux/store'

type APIResponse = {
      _id: string;
      name: string;
      email: string;
}

type Instructor = {
      _id: string;
      name: string;
      email: string;
}

// View information about a course
const DetailCourse = () => {
      const { courseId } = useParams();
      const [fields, setFields] = React.useState<any>({});
      const role = localStorage.getItem('role');
      const course = useSelector((state: RootState) => selectCourseById(state, courseId as string))

      const [instructorData, setInstructorData] = React.useState<Instructor>({
            _id: '',
            name: '',
            email: ''
      });

      useEffect(() => {
            axios.get(`http://localhost:8000/api/instructors/${courseId}`)
                  .then(res => {
                        setInstructorData(res.data);
                  })
                  .catch(err => console.log(err));
      }, [courseId])

      return (
            <>
                  <Container maxW="container.xl" color={useColorModeValue('gray.700', 'gray.500')}>
                        <Flex direction="column" minH="100vh">
                              <Heading as="h1" size="xl" textAlign="start" py={8}>
                                    {course?.title}
                              </Heading>
                              <Text fontSize="xl">
                                    {course?.subject} {course?.number} - {course?.term}
                              </Text>
                              <Text fontSize="xl" py={8}>
                                    <b>Instructor:</b> {instructorData.name} <br />
                                    <b>Email Address:</b> {instructorData.email}
                              </Text>
                        </Flex>
                  </Container>
            </>
      )
}

export default DetailCourse
