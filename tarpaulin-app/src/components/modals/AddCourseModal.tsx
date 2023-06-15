import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNewCourse } from "../../redux/CourseSlice";
import { AppDispatch } from "../../redux/store";
import axios from "axios";

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: "instructor" | "admin" | "student";
}

type Instructor = {
  _id: string;
  name: string;
  email: string;
};

type APIResponse = {
  data: Instructor[];
};

const AddCourseModal: React.FC<AddCourseModalProps> = ({
  isOpen,
  onClose,
  role,
}) => {
  const [title, setTitle] = React.useState<string>("");
  const [subject, setSubject] = React.useState<string>("");
  const [number, setNumber] = React.useState<string>("");
  const [instructorId, setInstructorId] = React.useState<string>("");
  const [term, setTerm] = React.useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const [instructors, setInstructors] = React.useState<Instructor[]>([]);

  useEffect(() => {
    const response = axios.get("http://localhost:8000/api/instructors");
    response.then((res: APIResponse) => {
      setInstructors(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  if (role === "student") {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(addNewCourse({ title, subject, number, instructorId, term }));
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Course</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl id="title">
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
              <FormControl id="subject">
                <FormLabel>Subject</FormLabel>
                <Input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </FormControl>
              <FormControl id="number">
                <FormLabel>Number</FormLabel>
                <Input
                  type="text"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </FormControl>
              <FormControl id="instructorId">
                <FormLabel>Instructor</FormLabel>
                {instructors.length > 0 && (
                  <Select
                    placeholder="Select an Instructor"
                    onChange={(e) => setInstructorId(e.target.value)}
                  >
                    {instructors.map((instructor) => (
                      <option value={instructor._id}>
                        {instructor.name} || {instructor.email} 
                      </option>
                    ))}
                  </Select>
                )}
              </FormControl>
              <FormControl id="term">
                <FormLabel>Term</FormLabel>
                <Input
                  type="text"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleSubmit}>
              Add Course
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddCourseModal;
