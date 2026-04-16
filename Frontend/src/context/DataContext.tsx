import { createContext, useContext, useState, type ReactNode } from "react";
import { knowledgePosts, type KnowledgePost } from "../data/posts";
import { bugReports, type BugReport } from "../data/bugs";
import { exitInterviews, type ExitInterview } from "../data/interviews";

interface DataContextType {
  posts: KnowledgePost[];
  bugs: BugReport[];
  interviews: ExitInterview[];
  addPost: (post: Omit<KnowledgePost, "id" | "createdAt" | "status" | "points">) => void;
  addBug: (bug: Omit<BugReport, "id" | "createdAt" | "status">) => void;
  addInterview: (interview: Omit<ExitInterview, "id">) => void;
  approvePost: (id: string) => void;
  rejectPost: (id: string) => void;
  approveBug: (id: string) => void;
  rejectBug: (id: string) => void;
}

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<KnowledgePost[]>(knowledgePosts);
  const [bugs, setBugs] = useState<BugReport[]>(bugReports);
  const [interviews, setInterviews] = useState<ExitInterview[]>(exitInterviews);

  const addPost = (post: Omit<KnowledgePost, "id" | "createdAt" | "status" | "points">) => {
    setPosts((prev) => [
      { ...post, id: `kp${Date.now()}`, createdAt: new Date().toISOString().split("T")[0], status: "pending", points: 10 },
      ...prev,
    ]);
  };

  const addBug = (bug: Omit<BugReport, "id" | "createdAt" | "status">) => {
    setBugs((prev) => [
      { ...bug, id: `b${Date.now()}`, createdAt: new Date().toISOString().split("T")[0], status: "pending" },
      ...prev,
    ]);
  };

  const addInterview = (interview: Omit<ExitInterview, "id">) => {
    setInterviews((prev) => [{ ...interview, id: `ei${Date.now()}` }, ...prev]);
  };

  const approvePost = (id: string) => setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, status: "approved" } : p)));
  const rejectPost = (id: string) => setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, status: "rejected" } : p)));
  const approveBug = (id: string) => setBugs((prev) => prev.map((b) => (b.id === id ? { ...b, status: "approved" } : b)));
  const rejectBug = (id: string) => setBugs((prev) => prev.map((b) => (b.id === id ? { ...b, status: "rejected" } : b)));

  return (
    <DataContext.Provider value={{ posts, bugs, interviews, addPost, addBug, addInterview, approvePost, rejectPost, approveBug, rejectBug }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
