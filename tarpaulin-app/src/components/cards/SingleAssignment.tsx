import { Box, Button, chakra, CloseButton, Container, Image, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Text, useColorModeValue } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeAssignment } from '../../redux/CourseSlice';
import { AppDispatch } from '../../redux/store';
import { Assignment } from '../../types';

interface Props {
  assignment: Assignment;
}

const SingleAssignment = ({ assignment }: Props) => {
  const initialFocusRef = React.useRef<HTMLButtonElement>(null)
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(removeAssignment({ assignmentId: assignment._id as string }));
  }

  const role = localStorage.getItem('role');

  return (
    <>
      {/* onClick={() => navigate(`/dashboard/submissions/${assignment._id}`)}  */}
      <Container maxW="container.xl">
        <Box
          borderWidth="1px"
          rounded="lg"
          shadow="lg"
          position="relative"
          overflow="hidden"
          bg={useColorModeValue('white', 'gray.800')}
        >
          { role !== "student" && (
          <Popover
            initialFocusRef={initialFocusRef}
            placement="bottom"
          >
            <PopoverTrigger>
              <CloseButton position="absolute" right="8px" top="8px" value={assignment._id} key={assignment._id} />
            </PopoverTrigger>
            <PopoverContent p={2}>
              <PopoverHeader fontWeight="semibold">Delete Course</PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>Are you sure you want delete this assignment?</PopoverBody>
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
          )}

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
                {assignment.title}
              </chakra.h3>
              <Text noOfLines={2} pt={4} fontSize={{ base: 'md', sm: 'lg' }}>
                {assignment.points} points <br />
                Due: {moment(assignment.due).format('MMMM Do YYYY, h:mm:ss a')} <br />
              </Text>
            </Box>
          </Box>
        </Box>
      </Container >
    </>
  )
}

export default SingleAssignment
