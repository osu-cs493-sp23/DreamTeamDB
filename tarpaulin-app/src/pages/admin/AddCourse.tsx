import { Box, Button, Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import React from 'react'
import { addNewCourse } from '../../redux/CourseSlice'
import { AppDispatch } from '../../redux/store';
import { Course } from '../../types';
import { useDispatch } from 'react-redux';

const AddCourse = () => {
      return (
            <Box height="full" width="full">
                  <Form />
            </Box>
      )
}

const Form = () => {
      const [title, setTitle] = React.useState<string>('')
      const [subject, setSubject] = React.useState<string>('')
      const [number, setNumber] = React.useState<string>('')
      const [instructorId, setInstructorId] = React.useState<string>('')
      const [term, setTerm] = React.useState<string>('')
      const [status, setStatus] = React.useState<string>('')

      const dispatch = useDispatch<AppDispatch>()


      const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
            e.preventDefault()

            const courseToAdd: Course = {
                  title,
                  subject,
                  number,
                  instructorId,
                  term
            }

            dispatch(addNewCourse(courseToAdd))


            // try {
            //       const response = await axios.post('http://localhost:8000/api/courses', {
            //             title,
            //             subject,
            //             number,
            //             instructorId,
            //             term
            //       }, {
            //             headers: {
            //                   Authorization: `Bearer ${token}`
            //             }
            //       })

            //       if (response.status === 201) {
            //             setStatus('Course Added!')
            //       } else {
            //             setStatus('Course Not Added!')
            //       }

            // } catch (error) {
            //       setStatus('Error Adding Course!')
            // }

      }

      return (
            <Flex
                  width="full"
                  align="center"
                  justifyContent="center"
                  mt="8"
            >
                  <Box
                        p={8}
                        maxWidth="500px"
                        borderWidth={1}
                        borderRadius={8}
                        boxShadow="lg"
                  >
                        <Text align="center" fontSize="3xl" mb="8" fontWeight="bold">
                              Add Course
                        </Text>
                        <form>
                              <FormControl isRequired>
                                    <FormLabel>Title</FormLabel>
                                    <Input
                                          type="text"
                                          placeholder="Title"
                                          size="lg"
                                          onChange={(e) => setTitle(e.target.value)}
                                    />
                              </FormControl>
                              <FormControl isRequired>
                                    <FormLabel>Subject</FormLabel>
                                    <Input
                                          type="text"
                                          placeholder="Subject"
                                          size="lg"
                                          onChange={(e) => setSubject(e.target.value)}
                                    />
                              </FormControl>
                              <FormControl isRequired>
                                    <FormLabel>Course Number</FormLabel>
                                    <Input
                                          type="number"
                                          placeholder="Course Number"
                                          size="lg"
                                          onChange={(e) => setNumber(e.target.value)}
                                    />
                              </FormControl>
                              <FormControl isRequired>
                                    <FormLabel>Instructor ID</FormLabel>
                                    <Input
                                          type="text"
                                          placeholder="Instructor ID"
                                          size="lg"
                                          onChange={(e) => setInstructorId(e.target.value)}
                                    />
                              </FormControl>
                              <FormControl isRequired>
                                    <FormLabel>Term</FormLabel>
                                    <Input
                                          type="text"
                                          placeholder="Term"
                                          size="lg"
                                          onChange={(e) => setTerm(e.target.value)}
                                    />
                              </FormControl>
                              <Text align="center" fontSize="3xl" mt="8">
                                    {status}
                              </Text>
                              <Button
                                    width="full"
                                    mt={4}
                                    type="submit"
                                    colorScheme="teal"
                                    onClick={handleSubmit}
                              >
                                    Add Course
                              </Button>
                        </form>
                  </Box>
            </Flex>
      )
}

export default AddCourse
