import { Box, Button, Checkbox, CheckboxGroup, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import useStudents from '../../hooks/useStudents';

const UpdateCourse = () => {
      return (
            <Box height="full" width="full">
                  <Form />
            </Box>
      )
}

type Student = {
      _id: string,
      name: string,
      email: string
}

const Form = () => {
      const [add, setAdd] = React.useState<Array<string>>([])
      const [remove, setRemove] = React.useState<Array<string>>([])
      const [courseId, setCourseId] = React.useState<string>('')
      const [status, setStatus] = React.useState<string>('')
      const students = useStudents({ courseId: courseId || null })

      const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
            const token = localStorage.getItem('token')
            e.preventDefault()

            try {
                  const response = await axios.post(`http://localhost:8000/api/courses/${courseId}/students`, {
                        add,
                        remove
                  }, {
                        headers: {
                              Authorization: `Bearer ${token}`
                        }
                  })

                  if (response.status === 200) {
                        setStatus('Course Updated!')
                  } else {
                        setStatus('Course Not Updated!')
                  }

            } catch (error) {
                  setStatus('Error Updating Course!')
            }
      }

      // useEffect(() => {
      //       console.log(add)
      // }, [add])

      // useEffect(() => {
      //       console.log(remove)
      // }, [remove])


      return students && (
            <Box
                  p={8}
                  maxWidth="500px"
                  borderWidth={1}
                  borderColor="gray.200"
                  borderRadius={8}
                  boxShadow="lg"
                  mt="8"
            >
                  <form>
                        <Stack spacing={4}>
                              <FormControl id="courseId" isRequired>
                                    <FormLabel>Course ID</FormLabel>
                                    <Input type="text" value={courseId} onChange={(e) => setCourseId(e.target.value)} />
                              </FormControl>
                              <FormControl id="add">
                                    <FormLabel>Add</FormLabel>
                                    <CheckboxGroup colorScheme="green" onChange={(values) => setAdd(values as Array<string>)}>
                                          <Stack spacing={2}>
                                                {students.map((student: Student) => (
                                                      <Checkbox key={student._id} value={student._id}>{student.name}</Checkbox>
                                                ))}
                                          </Stack>
                                    </CheckboxGroup>
                              </FormControl>

                              <FormControl id="remove">
                                    <FormLabel>Remove</FormLabel>
                                    <CheckboxGroup colorScheme="red" onChange={(values) => setRemove(values as Array<string>)}>
                                          <Stack spacing={2}>
                                                {students.map((student: Student) => (
                                                      <Checkbox key={student._id} value={student._id}>{student.name}</Checkbox>
                                                ))}
                                          </Stack>
                                    </CheckboxGroup>
                              </FormControl>

                              <Box>
                                    {status}
                              </Box>

                              <Button
                                    type="submit"
                                    variant="outline"
                                    colorScheme="teal"
                                    size="lg"
                                    onClick={handleSubmit}
                              >
                                    Submit
                              </Button>
                        </Stack>
                  </form>
            </Box>
      )

}

export default UpdateCourse