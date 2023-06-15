import { Box, Flex, Heading } from '@chakra-ui/react';
import UpdateCourse from './admin/UpdateCourse';

const Roster = () => {
      const role = localStorage.getItem('role') as "instructor" | "admin" | "student"
      return (
            <>
                  <Flex direction="column" minH="100vh">
                        <Flex direction="column" align="center" justify="center">
                              <Box w="100%" p={4}>
                                    {role !== "student" && (
                                          <>
                                                <Heading as="h1" size="xl" textAlign="left" color="gray.500" py={8}>
                                                      Update Course Roster
                                                </Heading>
                                                <UpdateCourse />
                                          </>
                                    )}
                                    {role === "student" && (
                                          <Heading as="h1" size="xl" textAlign="left" color="gray.500" py={8}>
                                                Unauthorized Access
                                          </Heading>
                                    )}
                              </Box>
                        </Flex>
                  </Flex >
            </>
      )
}

export default Roster
