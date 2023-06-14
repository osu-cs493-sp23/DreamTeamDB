import axios from 'axios';
import { useEffect, useState } from 'react';

const useCourses = (page: number, subject: string, number: string, term: string) => {
      const [courses, setCourses] = useState([]);
      const [error, setError] = useState<string | null>(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            const token = localStorage.getItem('token');
            const fetchCourses = async () => {
                  try {
                        const response = await axios.get('http://localhost:8000/api/courses', {
                              params: { page, subject, number, term },
                              headers: { Authorization: `Bearer ${token}` },
                        });
                        setCourses(response.data.courses);
                        setLoading(false);
                  } catch (error) {
                        setError('Error fetching courses.');
                        setLoading(false);
                  }
            };

            fetchCourses();
      }, [page, subject, number, term]);

      return { courses, error, loading, setCourses };
};

export default useCourses;
