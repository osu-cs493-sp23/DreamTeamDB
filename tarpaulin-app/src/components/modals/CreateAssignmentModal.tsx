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
  Stack
} from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { createAssignment } from "../../redux/CourseSlice";
import { AppDispatch } from "../../redux/store";

interface CreteAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: "instructor" | "admin" | "student";
  courseId: string;
}

const CreateAssignmentModal: React.FC<CreteAssignmentModalProps> = ({
  isOpen,
  onClose,
  courseId
}) => {
  const [title, setTitle] = React.useState<string>("");
  const [points, setPoints] = React.useState<number>(0);
  const [due, setDue] = React.useState<Date>(new Date());
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Assignment</ModalHeader>
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
              <FormControl id="points">
                <FormLabel>Points</FormLabel>
                <Input
                  type="text"
                  value={points}
                  onChange={(e) => setPoints(parseInt(e.target.value))}
                />
              </FormControl>
              <FormControl id="dueDate">
                <FormLabel>Due Date</FormLabel>
                <Input
                  type="datetime-local"
                  onChange={(e) => setDue(new Date(e.target.value))}
                  value={due.toISOString().substring(0, 16)}
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                dispatch(createAssignment({ title, points, due, courseId }));
                onClose();
              }}
            >
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>



  )
}

export default CreateAssignmentModal
