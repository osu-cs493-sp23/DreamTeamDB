import { Box, Button, Flex, Heading, useDisclosure } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CourseGrid from '../components/grid/CourseGrid';
import AddCourseModal from '../components/modals/AddCourseModal';
import { fetchCourses } from '../redux/CourseSlice';
import { AppDispatch } from '../redux/store';

const Courses = () => {
      const { isOpen, onOpen, onClose } = useDisclosure()
      const role = localStorage.getItem('role') as "instructor" | "admin" | "student"
      const dispatch = useDispatch<AppDispatch>()
      useEffect(() => {
            dispatch(fetchCourses())
      }, [dispatch])
      return (
            <>
                  <Flex direction="column" minH="100vh">
                        <Flex align="center" justify="center" gap={2}>
                              <Heading as="h1" size="xl" textAlign="start" color="gray.500" py={8}>
                                    {role === "student" ? "Enrolled" : ""} Courses
                              </Heading>
                              <Box w="100%" p={4}>
                                    {role !== "student" && (
                                          <>
                                                <Button
                                                      colorScheme="gray"
                                                      size="md"
                                                      onClick={onOpen}
                                                >
                                                      Add Course
                                                </Button>
                                                <AddCourseModal isOpen={isOpen} onClose={onClose} role={role} />
                                          </>
                                    )}
                              </Box>
                        </Flex>
                        <CourseGrid />
                  </Flex>
            </>
      )
}

export default Courses
