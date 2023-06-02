import { User } from "../types";

export const users: User[] = [
  {
    id: 1,
    name: "Jane Doe",
    email: "doej@oregonstate.edu",
    password: "hunter2",
    role: "student"
  },
  {
    id: 2,
    name: "John Smith",
    email: "smithj@oregonstate.edu",
    password: "letmein",
    role: "student"
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "johnsona@oregonstate.edu",
    password: "password123",
    role: "student"
  },
  {
    id: 4,
    name: "Bob Thompson",
    email: "thompsonb@oregonstate.edu",
    password: "securepw",
    role: "student"
  },
  {
    id: 5,
    name: "Emily Davis",
    email: "davise@oregonstate.edu",
    password: "qwerty",
    role: "student"
  },
  // Add more users as needed
];
