import { Box, Button, CloseButton, Container, Image, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Text, chakra, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { removeCourse } from '../../redux/CourseSlice';
import { AppDispatch } from '../../redux/store';
import { Course } from '../../types';
import { useNavigate } from 'react-router-dom';

interface CourseProps {
      course: Course
}

const SingleCourse = ({ course }: CourseProps) => {
      const initialFocusRef = React.useRef<HTMLButtonElement>(null)
      const dispatch = useDispatch<AppDispatch>();
      const navigate = useNavigate();

      const handleDelete = (e: React.FormEvent<HTMLButtonElement>) => {
            e.preventDefault();
            dispatch(removeCourse({ courseId: course._id }));
      }

      return (
            <>
                  <Container maxW="container.xl" onClick={() => navigate(`/dashboard/courses/${course._id}`)} style={{ cursor: 'pointer' }} transition={'all .2s ease-in-out'} _hover={{ transform: 'scale(1.05)' }}>
                        <Box
                              borderWidth="1px"
                              rounded="lg"
                              shadow="lg"
                              position="relative"
                              overflow="hidden"
                              bg={useColorModeValue('white', 'gray.800')}
                        >

                              <Popover
                                    initialFocusRef={initialFocusRef}
                                    placement="end-end"
                              >
                                    <PopoverTrigger>
                                          <CloseButton position="absolute" right="8px" top="8px" value={course._id} key={course._id} />
                                    </PopoverTrigger>
                                    <PopoverContent p={2}>
                                          <PopoverHeader fontWeight="semibold">Delete Course</PopoverHeader>
                                          <PopoverArrow />
                                          <PopoverCloseButton />
                                          <PopoverBody>Are you sure you want delete this course?</PopoverBody>
                                          <PopoverFooter style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                <Button
                                                      colorScheme="red"
                                                      size="sm"
                                                      ref={initialFocusRef}
                                                      onClick={handleDelete}
                                                >
                                                      Delete
                                                </Button>

                                          </PopoverFooter>
                                    </PopoverContent>
                              </Popover>

                              <Image
                                    src="https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80"
                                    objectFit="cover"
                                    w="100%"
                              />
                              <Box maxW="xl" mx="auto" px={{ base: 4, lg: 8 }} py={{ base: 3, lg: 6 }} zIndex={1}>
                                    <Box mb={{ base: 4, md: 8 }}>
                                          <chakra.h3
                                                fontSize={{ base: 'xl', sm: '2xl' }}
                                                fontWeight="bold"
                                                lineHeight="1.2"
                                                mb={2}
                                          >
                                                {course.title}
                                          </chakra.h3>
                                          <Text noOfLines={2} pt={4} fontSize={{ base: 'md', sm: 'lg' }}>
                                                {course.subject + course.number} - {course.term}
                                          </Text>
                                    </Box>
                              </Box>
                        </Box>
                  </Container >
            </>
      )
}

export default SingleCourse
