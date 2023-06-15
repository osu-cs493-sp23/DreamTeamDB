import {
      Accordion,
      AccordionButton,
      AccordionIcon,
      AccordionItem,
      AccordionPanel,
      Box,
      Button,
      CloseButton,
      Container,
      Flex,
      Image,
      Stack,
      Text,
      chakra,
      useColorModeValue,
      useDisclosure
} from '@chakra-ui/react';
import axios from 'axios';
import moment from 'moment';
import React, { useMemo } from 'react';
import useAssignments from '../../hooks/useAssignments';
import { Assignment, Course } from '../../types';
import CourseDetailModal from '../view/CourseDetailModal';
import { CreateAssignmentModal } from './Assignment';


interface CourseProps {
      title: string;
      subject: string;
      number: string;
      instructorId: string;
      term: string;
      _id: string;
      // deleteCourse(e: React.FormEvent<HTMLButtonElement>): void;
}

const CourseCard: React.FC<CourseProps> = ({ title, subject, number, instructorId, term, _id } ) => {
      const role = localStorage.getItem('role');
      const { isOpen, onOpen, onClose } = useDisclosure();
      const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
      const [showAssignments, setShowAssignments] = React.useState<boolean>(false);
      const course = useMemo(() => {
            const course: Course = { title, subject, number, instructorId, term, _id };
            return course;
      }, [title, subject, number, instructorId, term, _id])

      const { assignments } = useAssignments({ courseId: _id });

      return (
            <Container maxW="container.xl">
                  <Box
                        borderWidth="1px"
                        rounded="lg"
                        shadow="lg"
                        position="relative"
                        overflow="hidden"
                        bg={useColorModeValue('white', 'gray.800')}
                  >
                        <CloseButton position="absolute" right="8px" top="8px" value={_id} key={_id} />
                        <Image
                              src="https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80"
                              objectFit="cover"
                              w="100%"
                        />
                        <Box maxW="xl" mx="auto" px={{ base: 4, lg: 8 }} py={{ base: 3, lg: 6 }} zIndex={1}>
                              <Box mb={{ base: 4, md: 8 }}>
                                    <chakra.h3
                                          fontSize={{ base: 'lg', sm: '2xl' }}
                                          fontWeight="bold"
                                          lineHeight="1.2"
                                          mb={2}
                                    >
                                          {subject + number} - {term}
                                    </chakra.h3>
                                    <Text fontSize={{ base: 'md', sm: 'lg' }} noOfLines={2}>
                                          {title}
                                    </Text>
                              </Box>
                              <Stack
                                    justify="space-between"
                                    dir='column'
                              >
                                    <Button
                                          as="a"
                                          href="#"
                                          size="sm"
                                          w={{ base: 'full', sm: 'auto' }}
                                          fontSize="sm"
                                          fontWeight="bold"
                                          px="4"
                                          py="2"
                                          h="auto"
                                          onClick={onOpen}
                                    >
                                          <CourseDetailModal isOpen={isOpen} onClose={onClose} course={course} />
                                          View
                                    </Button>
                                    <Button
                                          px="4"
                                          py="2"
                                          h="auto"
                                          size="sm"
                                          fontSize="sm"
                                          fontWeight="bold"
                                          w={{ base: 'full', sm: 'auto' }}
                                          onClick={() => setShowAssignments(!showAssignments)}
                                    >
                                          {showAssignments ? 'Hide' : 'Show'} {assignments?.length} Assignments
                                    </Button>
                                    <Flex align="center" justify="flex-end" mt={{ base: 2, sm: 0 }}>
                                          {showAssignments && <AssignmentAccordion assignments={assignments} />}
                                    </Flex>
                                    {(role === "admin" || role === "instructor") && (
                                          <CreateAssignmentModal isOpen2={isOpen2} onClose2={onClose2} onOpen2={onOpen2} />
                                    )}
                              </Stack>
                        </Box>
                  </Box>
            </Container>
      );
};

const AssignmentAccordion: React.FC<{ assignments: Array<any> }> = ({ assignments }) => {
      const role = localStorage.getItem('role');
      return (
            <Flex direction="column" align="center" justify="center" mt={4} gap={4}>
                  <Box w={{ base: 'full', sm: 'auto' }} shadow="lg" rounded="lg" overflow="hidden" mt={4}>
                        <Accordion allowToggle w={{ base: 'full', sm: 'auto' }}>
                              {assignments.map((assignment: Assignment) => (
                                    <AccordionItem key={assignment._id} w={{ base: 'full', sm: 'auto' }}>
                                          <h2>
                                                <AccordionButton>
                                                      <Box flex="1" textAlign="left">
                                                            {assignment.title}
                                                      </Box>
                                                      <AccordionIcon />
                                                </AccordionButton>
                                          </h2>
                                          <AccordionPanel pb={4} w={{ base: 'full', sm: 'auto' }}>
                                                <Box p={5}>
                                                      <Text>Points: {assignment.points}</Text>
                                                      <Text>Due: {moment(assignment.due).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                                                </Box>
                                          </AccordionPanel>
                                          {(role === "admin" && assignments.length > 0) && <AdminButtons assignmentId={assignment._id} />}

                                    </AccordionItem>

                              ))}

                        </Accordion>

                  </Box>
            </Flex>
      )
}

const AdminButtons = ({ assignmentId }: { assignmentId: string }) => {


      const handleDelete = async (e: React.FormEvent<HTMLButtonElement>) => {
            const token = localStorage.getItem('token')
            e.preventDefault()

            try {
                  const response = await axios.delete(`http://localhost:8000/api/assignments/${assignmentId}`, {
                        headers: {
                              Authorization: `Bearer ${token}`
                        }
                  })

                  if (response.status === 204) {
                        console.log('Assignment Deleted!')
                  } else {
                        console.log('Assignment Not Deleted!')
                  }

            } catch (error) {
                  console.log('Error Deleting Assignment!')
            }

      }

      return (
            <>
                  <Button my={4} mx={4} w={{ base: 'full', sm: 'auto' }} fontSize="sm" fontWeight="bold" colorScheme="teal" onClick={handleDelete}>
                        Delete Assignment
                  </Button>
            </>
      )
}

export default CourseCard;