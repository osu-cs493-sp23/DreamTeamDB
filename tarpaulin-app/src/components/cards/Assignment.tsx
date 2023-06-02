/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import { Assignment } from '../../types';
import { useNavigate } from 'react-router-dom';
import {
      chakra,
      Container,
      HStack,
      VStack,
      Text,
      Tag,
      Link,
      Image,
      useColorModeValue,
      SimpleGrid,
      Button,
      MenuButton,
      Menu,
      MenuDivider,
      MenuList,
      MenuItem,
      Modal,
      ModalOverlay,
      ModalContent,
      ModalHeader,
      ModalCloseButton,
      ModalBody,
      ModalFooter,
      useDisclosure,
      NumberInputField,
      NumberInputStepper,
      NumberIncrementStepper,
      NumberDecrementStepper,
      Center,
      IconButton,
      Input,
      NumberInput,
      Flex,
} from '@chakra-ui/react';
import { UserContext } from '../../context/UserContext';
import { AiOutlinePlusSquare } from 'react-icons/ai';


interface AssignmentCardProps {
      assignment: Assignment;
}


const assignmentList: Assignment[] = [
      {
            courseId: '1',
            title: 'Assignment 1',
            points: 100,
            due: new Date(Date.now() - 43200000),
      },
      {
            courseId: '2',
            title: 'Assignment 2',
            points: 100,
            due: new Date(Date.now() + 43200000),
      },
      {
            courseId: '3',
            title: 'Assignment 3',
            points: 100,
            due: new Date(Date.now() - 86400000),
      },
      {
            courseId: '4',
            title: 'Assignment 4',
            points: 100,
            due: new Date(Date.now() - 172800000),
      },
      {
            courseId: '5',
            title: 'Assignment 5',
            points: 100,
            due: new Date(Date.now() - 259200000),
      },
      {
            courseId: '6',
            title: 'Assignment 1',
            points: 100,
            due: new Date(),
      },
      {
            courseId: '7',
            title: 'Assignment 2',
            points: 100,
            due: new Date(Date.now() + 43200000),
      },
      {
            courseId: '8',
            title: 'Assignment 3',
            points: 100,
            due: new Date(Date.now() + 86400000),
      },
      {
            courseId: '9',
            title: 'Assignment 4',
            points: 100,
            due: new Date(Date.now() + 172800000),
      },
      {
            courseId: '10',
            title: 'Assignment 5',
            points: 100,
            due: new Date(Date.now() + 259200000),
      },
];

assignmentList.sort(() => Math.random() - 0.5);

interface CreateAssignmentModalProps {
      isOpen: boolean;
      onClose: () => void;
}

const CreateAssignmentModal: React.FC<CreateAssignmentModalProps> = ({ isOpen, onClose }) => {
      // CourseID will need to either be passed in, selected, or from url
      return (
            <>
                  <Center>
                        <IconButton aria-label="Create Assignment" icon={<AiOutlinePlusSquare />} size={'lg'} />
                  </Center>
                  <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                              <ModalHeader>Create A New Assignment</ModalHeader>
                              <ModalCloseButton />
                              <ModalBody my={4} as='form'>
                                    <Flex direction='column' justifyContent='space-between' gap={6}>
                                          <Input placeholder="Assignment Title" type='text' />
                                          <NumberInput placeholder='Points' min={0} max={100} defaultValue={0} precision={0}>
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                      <NumberIncrementStepper />
                                                      <NumberDecrementStepper />
                                                </NumberInputStepper>
                                          </NumberInput>
                                          <Input placeholder="Due Date" type='datetime-local' />
                                    </Flex>
                              </ModalBody>

                              <ModalFooter>
                                    <Button variant='outline' onClick={onClose}>Close</Button>
                                    <Button colorScheme='blue' ml={3}>
                                          Create
                                    </Button>
                              </ModalFooter>
                        </ModalContent>
                  </Modal >
            </>
      )
}


export const AssignmentCard: React.FC<AssignmentCardProps> = () => {
      const textColor = useColorModeValue('gray.500', 'gray.200');
      const navigate = useNavigate();
      const { user } = React.useContext(UserContext);
      const role = user?.role;
      const { isOpen, onOpen, onClose } = useDisclosure();
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
                                                <CreateAssignmentModal isOpen={isOpen} onClose={onClose} />
                                          </HStack>
                                    ) : (
                                          <></>
                                    )}
                                    {assignmentList.map(({ courseId, title, points, due }) => (
                                          <chakra.div key={courseId}>
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
                                                      spacing={4}
                                                      cursor="pointer"
                                                      _hover={{ shadow: 'lg' }}
                                                >
                                                      <Image
                                                            src={"https://avatars.githubusercontent.com/u/46255836?v=4"}
                                                            alt="avatar"
                                                            fallbackSrc="https://via.placeholder.com/150"
                                                            rounded="full"
                                                            w={12}
                                                            h={12}
                                                            bg="gray.100"
                                                            border="1px solid transparent"

                                                      />
                                                      <VStack align="start" justify="flex-start">
                                                            <HStack>
                                                                  <Text
                                                                        as={Link}
                                                                        href="#"
                                                                        fontWeight="bold"
                                                                        fontSize="md"
                                                                        noOfLines={1}
                                                                        onClick={(e) => {
                                                                              e.preventDefault();
                                                                              navigate(`/courses/${courseId}`);
                                                                        }}
                                                                        isExternal
                                                                  >
                                                                        {title}
                                                                  </Text>
                                                                  <Tag
                                                                        size="sm"
                                                                        ml={2}
                                                                        colorScheme={due < new Date() ? 'red' : 'green'}
                                                                        rounded="full"
                                                                        variant="solid"
                                                                  >
                                                                        Due {due.toLocaleDateString()}
                                                                  </Tag>
                                                            </HStack>
                                                            <Text fontSize="sm" color={textColor}>
                                                                  {points} points
                                                            </Text>
                                                            <VStack mt={4} spacing={2} alignItems="flex-start">
                                                                  <Menu isLazy>
                                                                        <MenuButton>Assignment Actions</MenuButton>
                                                                        <MenuList>
                                                                              {(role === 'instructor' || role === 'admin') ? (
                                                                                    <>
                                                                                          <MenuItem>Edit</MenuItem>
                                                                                          <MenuDivider />
                                                                                          <MenuItem>Delete</MenuItem>
                                                                                          <MenuDivider />
                                                                                          <MenuItem>View Submissions</MenuItem>
                                                                                    </>
                                                                              ) : (
                                                                                    <>
                                                                                          <MenuItem>View</MenuItem>
                                                                                          <MenuDivider />
                                                                                          <MenuItem>Submit</MenuItem>
                                                                                    </>
                                                                              )}
                                                                        </MenuList>
                                                                  </Menu>
                                                            </VStack>
                                                      </VStack>
                                                </HStack>
                                          </chakra.div>
                                    ))}
                              </SimpleGrid>
                        </VStack>
                  </Container >
            </>
      );
};
