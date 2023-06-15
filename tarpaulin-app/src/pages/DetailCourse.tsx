import { Button, Container, Flex, Heading, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import EnrollmentTable from '../components/EnrollmentTable'
import AssignmentsGrid from '../components/grid/AssignmentsGrid'
import CreateAssignmentModal from '../components/modals/CreateAssignmentModal'
import { fetchCourses, getAssignments, getStudentsInCourse, selectCourseById } from '../redux/CourseSlice'
import { AppDispatch, RootState } from '../redux/store'

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
      const navigate = useNavigate();

      const dispatch = useDispatch<AppDispatch>();

      const [instructorData, setInstructorData] = React.useState<Instructor>({
            _id: '',
            name: '',
            email: ''
      });

      const { isOpen, onOpen, onClose } = useDisclosure();

      useEffect(() => {
            axios.get(`http://localhost:8000/api/instructors/${courseId}`)
                  .then(res => {
                        setInstructorData(res.data);
                  })
                  .catch(err => console.log(err));

            dispatch(fetchCourses());
            // This is a rendering hack to make sure that the assignments are loaded
            setTimeout(() => {
                  dispatch(getAssignments({ courseId: courseId as string }));
                  dispatch(getStudentsInCourse({ courseId: courseId as string }));
            }, 100);
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
                              <Flex direction="row" justify="flex-start" align="center" gap={4}>
                                    <Heading as="h2" size="lg" textAlign="start" py={8}>
                                          Assignments
                                    </Heading>
                                    {role !== "student" && (
                                          <>

                                                <Button
                                                      colorScheme="gray"
                                                      size="md"
                                                      onClick={onOpen}
                                                >
                                                      Add Assignment
                                                </Button>
                                                <CreateAssignmentModal isOpen={isOpen} onClose={onClose} role={role as "instructor" | "admin" | "student"} courseId={courseId as string} />
                                          </>
                                    )}
                              </Flex>
                              <Flex gap={8} py={8} direction="column">
                                    <AssignmentsGrid courseId={courseId as string} />

                                    <Flex direction="row" justify="flex-start" align="center" gap={4} py={8}>
                                          <Heading as="h2" size="lg" textAlign="start">
                                                {course?.title}'s Roster
                                          </Heading>
                                          <Button colorScheme="gray" size="md" onClick={() => navigate(`/dashboard`)}>
                                                Update Roster
                                          </Button>
                                    </Flex>
                                    <EnrollmentTable courseId={courseId as string} />
                              </Flex>
                        </Flex>
                  </Container>
            </>
      )
}

export default DetailCourse
