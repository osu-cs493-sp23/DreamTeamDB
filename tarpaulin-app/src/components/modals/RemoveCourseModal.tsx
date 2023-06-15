import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from '../../redux/store';
import axios from "axios";

interface RemoveCourseModalProps {
      isOpen: boolean;
      onClose: () => void;
      role: "instructor" | "admin" | "student";
}

const RemoveCourseModal: React.FC<RemoveCourseModalProps> = ({
      isOpen,
      onClose,
      role,
}) => {

      const [instructors, setInstructors] = React.useState<any[]>([]);
      const { courses } = useSelector((state: RootState) => state.course);

      if (role === "student") {
            return null;
      }


      return (
            <>
                  </>
      )
}