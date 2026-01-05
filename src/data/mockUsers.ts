import { User } from "../types/Auth";

export const mockUsers: User[] = [
  {
    id: "1",
    firstName: "Alice",
    lastName: "Smith",
    email: "alice.smith@example.com",
    role: "admin",
    password: "admin123"
  },
  {
    id: "2",
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob.johnson@example.com",
    role: "officer",
    password: "officer123"
  },
  {
    id: "3",
    firstName: "Charlie",
    lastName: "Brown",
    email: "charlie.brown@example.com",
    role: "user",
    password: "user123"
  }
];