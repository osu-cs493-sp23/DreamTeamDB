import axios from 'axios';
import { useEffect, useState } from 'react';
import { Assignment } from '../types';

const useAssignments = ({ courseId }: { courseId: string }) => {
      const [assignments, setAssignments] = useState<Assignment[]>([]);
      const [error, setError] = useState<string | null>(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            const token = localStorage.getItem('token');
            const fetchCourses = async () => {
                  try {
                        const response = await axios.get(`http://localhost:8000/api/courses/${courseId}/assignments`, {
                              headers: { Authorization: `Bearer ${token}` },
                        });
                        setAssignments(response.data.assignments);
                        setLoading(false);
                  } catch (error) {
                        setError('Error fetching courses.');
                        setLoading(false);
                  }
            };

            fetchCourses();
      }, [courseId]);

      return { assignments, error, loading, setAssignments };
};

export default useAssignments;
