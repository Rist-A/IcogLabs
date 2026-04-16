export interface ExitInterview {
  id: string;
  employeeName: string;
  role: string;
  thumbnail: string;
  videoUrl: string;
  summary: string;
  date: string;
}

export const exitInterviews: ExitInterview[] = [
  {
    id: "ei1",
    employeeName: "Abebe Kebede",
    role: "Senior Software Engineer",
    thumbnail: "",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    summary: "Shared insights on scaling microservices and mentoring junior developers. Recommended more cross-team collaboration sessions.",
    date: "2025-03-15",
  },
  {
    id: "ei2",
    employeeName: "Sara Tesfaye",
    role: "ML Research Intern",
    thumbnail: "",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    summary: "Discussed her experience with the NLP research team. Suggested improving documentation for research datasets.",
    date: "2025-02-28",
  },
  {
    id: "ei3",
    employeeName: "Daniel Haile",
    role: "DevOps Lead",
    thumbnail: "",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    summary: "Provided feedback on CI/CD pipeline improvements and infrastructure scaling strategies for the growing team.",
    date: "2025-01-20",
  },
];
