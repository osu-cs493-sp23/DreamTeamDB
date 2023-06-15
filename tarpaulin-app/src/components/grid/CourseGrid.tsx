import { SimpleGrid } from '@chakra-ui/react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses, selectCourses } from '../../redux/CourseSlice';
import { AppDispatch } from '../../redux/store';
import { Course } from '../../types';
import SingleCourse from '../cards/SingleCourse';


// interface Props {
//       courses: Course[];
// }

const CourseGrid: React.FC = () => {
      const dispatch = useDispatch<AppDispatch>();
      useEffect(() => {
            dispatch(fetchCourses());
      }, [dispatch]);
      const coursesList = useSelector(selectCourses);
      const [parent] = useAutoAnimate();
      return (
            <>
                  <SimpleGrid columns={[1, 2, 3]} spacing={10} ref={parent}>
                        {coursesList.map((course: Course) => (
                              // <CourseCard key={course._id} title={course.title} subject={course.subject} number={course.number} instructorId={course.instructorId} term={course.term} _id={course._id} />
                              <SingleCourse course={course} />
                        ))}

                  </SimpleGrid>
            </>
      );
}

export default CourseGrid;