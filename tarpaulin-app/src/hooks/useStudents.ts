import axios from 'axios'
import React from 'react'


const useStudents = ({ courseId }: { courseId: string | undefined | null }) => {
      const [students, setStudents] = React.useState([])
     
      React.useEffect(() => {
            const fetchStudents = async () => {
                  const { data } = await axios.get(`http://localhost:8000/api/students`)
                  setStudents(data)
            }
            fetchStudents()
      }, [])

      return students
}

export default useStudents
