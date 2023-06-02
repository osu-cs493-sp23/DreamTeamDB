export interface Assignment {
  courseId: string;
  title: string;
  points: number;
  due: Date;
}

export interface Course {
  subject: string;
  number: string;
  title: string;
  term: string;
  instructorId: string;
}

export interface Submission {
  assignmentId: string;
  studentId: string;
  timestamp: Date;
  grade?: number;
  file?: string;
}

export interface User {
  name?: string;
  email: string;
  password: string;
  role?: "admin" | "instructor" | "student";
}

