import {
      Button,
      Editable,
      EditableInput,
      EditablePreview,
      Flex,
      Modal,
      ModalBody,
      ModalCloseButton,
      ModalContent,
      ModalFooter,
      ModalHeader,
      ModalOverlay,
      Text
} from '@chakra-ui/react';
import { Course } from '../../types';
import axios from 'axios';

interface CourseDetailModalProps {
      isOpen: boolean;
      onClose: () => void;
      course: Course;
}

const CourseDetailModal = ({ isOpen, onClose, course }: CourseDetailModalProps) => {

      const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
            const token = localStorage.getItem('token')
            e.preventDefault()

            try {
                  const response = await axios.patch(`http://localhost:8000/api/courses/${course._id}`, {
                        title: course.title,
                        subject: course.subject,
                        number: course.number,
                        term: course.term
                  }, {
                        headers: {
                              Authorization: `Bearer ${token}`
                        }
                  })

                  if (response.status === 200) {
                        onClose()
                  } else {
                        console.log('Error Updating Course!')
                  }

            } catch (error) {
                  console.log('Error Updating Course!')
            }
      }


      const role = localStorage.getItem('role');
      return (
            <>
                  <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                              <ModalHeader>{course.subject + course.number} - {course.term}</ModalHeader>
                              <ModalCloseButton />
                              <ModalBody>
                                    {role === "student" && (
                                          <>
                                                <Flex direction="row" mb={2} alignItems="center" justifyContent="flex-start" alignContent="center" gap={2}>
                                                      <Text>Title:</Text>
                                                      <Text>{course.title}</Text>
                                                </Flex>
                                                <Flex direction="row" mb={2} alignItems="center" justifyContent="flex-start" alignContent="center" gap={2}>
                                                      <Text>Subject:</Text>
                                                      <Text>{course.subject}</Text>
                                                </Flex>
                                                <Flex direction="row" mb={2} alignItems="center" justifyContent="flex-start" alignContent="center" gap={2}>
                                                      <Text>Number:</Text>
                                                      <Text>{course.number}</Text>
                                                </Flex>
                                                <Flex direction="row" mb={2} alignItems="center" justifyContent="flex-start" alignContent="center" gap={2}>
                                                      <Text>Term:</Text>
                                                      <Text>{course.term}</Text>
                                                </Flex>
                                          </>
                                    )}
                                    {(role === "instructor" || role === "admin") && (
                                          <>
                                                <Flex direction="row" mb={2} alignItems="center" justifyContent="flex-start" alignContent="center" gap={2}>
                                                      <Text>Title:</Text>
                                                      <Editable defaultValue={course.title} border={{ base: "none", md: "1px solid" }} borderColor="gray.300" borderRadius="md" p={1}>
                                                            <EditablePreview />
                                                            <EditableInput onChange={(e) => course.title = e.target.value} />
                                                      </Editable>
                                                </Flex>
                                                <Flex direction="row" mb={2} alignItems="center" justifyContent="flex-start" alignContent="center" gap={2}>
                                                      <Text>Subject:</Text>
                                                      <Editable defaultValue={course.subject} border={{ base: "none", md: "1px solid" }} borderColor="gray.300" borderRadius="md" p={1}>
                                                            <EditablePreview />
                                                            <EditableInput onChange={(e) => course.subject = e.target.value} />
                                                      </Editable>
                                                </Flex>
                                                <Flex direction="row" mb={2} alignItems="center" justifyContent="flex-start" alignContent="center" gap={2}>
                                                      <Text>Number:</Text>
                                                      <Editable defaultValue={course.number} border={{ base: "none", md: "1px solid" }} borderColor="gray.300" borderRadius="md" p={1}>
                                                            <EditablePreview />
                                                            <EditableInput onChange={(e) => course.number = e.target.value} />
                                                      </Editable>
                                                </Flex>
                                                <Flex direction="row" mb={2} alignItems="center" justifyContent="flex-start" alignContent="center" gap={2}>
                                                      <Text>Term:</Text>
                                                      <Editable defaultValue={course.term} border={{ base: "none", md: "1px solid" }} borderColor="gray.300" borderRadius="md" p={1}>
                                                            <EditablePreview />
                                                            <EditableInput onChange={(e) => course.term = e.target.value} />
                                                      </Editable>
                                                </Flex>
                                          </>
                                    )}
                              </ModalBody>

                              <ModalFooter>
                                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                                          Close
                                    </Button>
                                    {role === "student" && <Button variant="ghost">Enroll</Button>}
                                    {role === "instructor" && <Button
                                          onClick={handleSubmit}
                                          variant="ghost">Edit</Button>}
                                    {role === "admin" && <Button
                                          onClick={handleSubmit}
                                          variant="ghost">Edit</Button>}
                              </ModalFooter>
                        </ModalContent>
                  </Modal>
            </>
      )
}

export default CourseDetailModal