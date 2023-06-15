import { SimpleGrid } from '@chakra-ui/react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useSelector } from 'react-redux';
import { selectCourseAssignments } from '../../redux/CourseSlice';
import { RootState } from '../../redux/store';
import { Assignment } from '../../types';
import SingleAssignment from '../cards/SingleAssignment';

const AssignmentsGrid = ({ courseId }: { courseId: string }) => {
      const assignmentsList = useSelector((state: RootState) => selectCourseAssignments(state, courseId));
      const [parent] = useAutoAnimate();
      return (
            <>
                  <SimpleGrid columns={[1, 2, 3]} spacing={10} ref={parent}>
                        {assignmentsList?.map((assignment: Assignment) => (
                              <SingleAssignment assignment={assignment} key={assignment._id} />
                        ))}
                  </SimpleGrid>

            </>
      )
}

export default AssignmentsGrid
