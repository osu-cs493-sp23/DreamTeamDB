import {
      Box,
      Heading,
      Table,
      TableCaption,
      TableContainer,
      Tbody,
      Td,
      Th,
      Thead,
      Tr
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectStudentsInCourse } from '../redux/CourseSlice';
import { RootState } from '../redux/store';

interface Props {
      courseId: string;
}

const EnrollmentTable: React.FC<Props> = ({ courseId }) => {
      const students = useSelector((state: RootState) => selectStudentsInCourse(state, courseId));
      if (students?.length === 0) {
            return (
                  <Box w="100%" p={4}>
                        <Heading as="h2" size="md" color="gray.500" >
                              No students enrolled yet
                        </Heading>
                  </Box>
            )
      }

      return (
            <TableContainer maxW="container.xl">
                  <Table variant="striped" colorScheme="gray">
                        <TableCaption>Enrolled Students</TableCaption>
                        <Thead>
                              <Tr>
                                    <Th>Name</Th>
                                    <Th>Email</Th>
                              </Tr>
                        </Thead>
                        <Tbody>
                              {students?.map((student, index) => (
                                    <Tr key={index}>
                                          <Td>{student.name}</Td>
                                          <Td>{student.email}</Td>
                                    </Tr>
                              ))}
                        </Tbody>
                  </Table>
            </TableContainer>
      )
}

export default EnrollmentTable
