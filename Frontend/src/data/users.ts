export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  points: number;
  avatar: string;
  postsCount: number;
  bugsSubmitted: number;
  bugsApproved: number;
  bugsRejected: number;
}

export const users: User[] = [
  {
    id: "u1",
    name: "Rist Wubrist",
    email: "ristwubrist@gmail.com",
    password: "rist123",
    role: "user",
    points: 120,
    avatar: "RW",
    postsCount: 8,
    bugsSubmitted: 5,
    bugsApproved: 4,
    bugsRejected: 1,
  },
  {
    id: "u2",
    name: "Wubrist Admin",
    email: "wubrist@gmail.com",
    password: "wubrist123",
    role: "admin",
    points: 350,
    avatar: "WA",
    postsCount: 15,
    bugsSubmitted: 12,
    bugsApproved: 10,
    bugsRejected: 2,
  },
];
