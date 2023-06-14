/* eslint-disable react-hooks/rules-of-hooks */
import {
      Button,
      Center,
      Container,
      Flex,
      HStack,
      Input,
      Modal,
      ModalBody,
      ModalCloseButton,
      ModalContent,
      ModalFooter,
      ModalHeader,
      ModalOverlay,
      NumberDecrementStepper,
      NumberIncrementStepper,
      NumberInput,
      NumberInputField,
      NumberInputStepper,
      Select,
      SimpleGrid,
      VStack,
      useColorModeValue,
      useDisclosure
} from '@chakra-ui/react';
import axios from 'axios';
import * as React from 'react';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { UserContext } from '../../context/UserContext';
import useCourses from '../../hooks/useCourses';
import { Assignment, Course } from '../../types';


interface AssignmentCardProps {
      assignment?: Assignment;
}



interface CreateAssignmentModalProps {
      isOpen2: boolean;
      onClose2: () => void;
      onOpen2?: () => void;
}

export const CreateAssignmentModal: React.FC<CreateAssignmentModalProps> = ({ isOpen2, onClose2, onOpen2 }) => {
      const { courses } = useCourses(1, "", "", "");
      const [title, setTitle] = React.useState<string>('');
      const [points, setPoints] = React.useState<number>(0);
      const [due, setDue] = React.useState<Date>(new Date());
      const [course, setCourse] = React.useState<string>('');


      const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
            const token = localStorage.getItem('token');
            e.preventDefault();

            try {
                  const response = await axios.post(`http://localhost:8000/api/assignments`, {
                        title,
                        points,
                        due,
                        courseId: course
                  }, {
                        headers: {
                              Authorization: `Bearer ${token}`
                        }
                  });

                  if (response.status === 201) {
                        console.log('Assignment Created!');
                        onClose2();
                  } else {
                        console.log('Assignment Not Created!');
                  }

            } catch (error) {
                  console.log('Error Creating Assignment!');
            }

      };


      return (
            <>
                  <Center>
                        <Button px="4"
                              py="2"
                              h="auto"
                              size="sm"
                              fontSize="sm"
                              fontWeight="bold"
                              w={{ base: 'full', sm: 'auto' }} onClick={onOpen2} colorScheme='blue' leftIcon={<AiOutlinePlusSquare />}>
                              Create Assignment
                        </Button>
                  </Center>
                  <Modal blockScrollOnMount={true} isOpen={isOpen2} onClose={onClose2}>
                        <ModalOverlay />
                        <ModalContent>
                              <ModalHeader>Create A New Assignment</ModalHeader>
                              <ModalCloseButton />
                              <ModalBody my={4} as='form'>
                                    <Flex direction='column' justifyContent='space-between' gap={6}>
                                          <Input placeholder="Assignment Title" type='text' onChange={(e) => setTitle(e.target.value)} />
                                          <NumberInput placeholder='Points' min={0} max={100} defaultValue={0} precision={0} onChange={(e) => setPoints(parseInt(e))}>
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                      <NumberIncrementStepper />
                                                      <NumberDecrementStepper />
                                                </NumberInputStepper>
                                          </NumberInput>
                                          <Input placeholder="Due Date" type='datetime-local' onChange={(e) => setDue(new Date(e.target.value))} />
                                    </Flex>

                                    <Select placeholder="Select Course" onChange={(e) => setCourse(e.target.value)}>
                                          {courses.map((course: Course) => (
                                                <option key={course._id} value={course._id} >
                                                      {course.title}
                                                </option>
                                          ))}
                                    </Select>
                              </ModalBody>

                              <ModalFooter>
                                    <Button variant='outline' onClick={onClose2}>Close</Button>
                                    <Button colorScheme='blue' ml={3} onClick={handleSubmit}>
                                          Create
                                    </Button>
                              </ModalFooter>
                        </ModalContent>
                  </Modal >
            </>
      )
}


export const AssignmentCard: React.FC<AssignmentCardProps> = () => {
      const { user } = React.useContext(UserContext);
      const { isOpen, onOpen, onClose } = useDisclosure();
      const role = user?.role;

      return (
            <>
                  <Container p={4} maxW="container.xl">
                        <VStack spacing={4} alignItems="flex-start" w="100%">
                              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} mt={10}>
                                    {role === 'instructor' || role === 'admin' ? (
                                          <HStack
                                                p={4}
                                                bg={useColorModeValue('white', 'gray.800')}
                                                rounded="xl"
                                                borderWidth="1px"
                                                borderColor={useColorModeValue('gray.100', 'gray.700')}
                                                w="100%"
                                                h="100%"
                                                textAlign="left"
                                                align="start"
                                                onClick={onOpen}
                                                justifyContent={'center'}
                                                alignItems={'center'}
                                                spacing={4}
                                                cursor="pointer"
                                                _hover={{ shadow: 'lg', bg: useColorModeValue('gray.50', 'gray.900') }}
                                          >
                                                {/* <CreateAssignmentModal isOpen={isOpen} onClose={onClose} /> */}
                                          </HStack>
                                    ) : (
                                          <>

                                          </>
                                    )}
                              </SimpleGrid>
                        </VStack>
                  </Container >
            </>
      );
};
