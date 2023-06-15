export interface Assignment {
  courseId: string | number;
  title: string;
  points: number;
  due: Date;
  _id: string;
}

export type Course = {
  subject: string;
  number: string;
  title: string;
  term: string;
  instructorId: string;
  _id?: string;
}

export interface Submission {
  assignmentId: string | number;
  studentId: string | number;
  timestamp: Date;
  grade?: number;
  file?: string;
}

export interface User {
  token?: string;
  id?: string | number;
  name?: string;
  email: string;
  password: string;
  role?: "admin" | "instructor" | "student";
}

