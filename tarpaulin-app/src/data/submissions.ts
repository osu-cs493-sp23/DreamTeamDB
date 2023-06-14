import { Submission } from '../types';

export const submissions: Submission[] = [
  {
    assignmentId: 1,
    studentId: 1,
    timestamp: new Date("2022-06-14T17:00:00-07:00"),
    grade: 94.5,
    file: "string"
  },
  {
    assignmentId: 1,
    studentId: 2,
    timestamp: new Date("2022-06-14T17:10:00-07:00"),
    grade: 85.0,
    file: "string"
  },
  {
    assignmentId: 2,
    studentId: 1,
    timestamp: new Date("2022-06-15T12:00:00-07:00"),
    grade: 90.5,
    file: "string"
  },
  {
    assignmentId: 2,
    studentId: 3,
    timestamp: new Date("2022-06-15T12:30:00-07:00"),
    grade: 88.0,
    file: "string"
  },
  {
    assignmentId: 3,
    studentId: 4,
    timestamp: new Date("2022-06-16T17:00:00-07:00"),
    grade: 92.5,
    file: "string"
  },
  // Add more submissions as needed
];
