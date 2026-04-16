export interface KnowledgePost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  tags: string[];
  points: number;
  createdAt: string;
  status: "approved" | "pending" | "rejected";
}

export const knowledgePosts: KnowledgePost[] = [
  {
    id: "kp1",
    title: "Effective Code Review Practices",
    content: "Code reviews are essential for maintaining code quality. Always focus on logic, readability, and potential edge cases. Use a checklist approach: verify error handling, check for memory leaks, and ensure proper naming conventions. Share context in PR descriptions to help reviewers understand the 'why' behind changes.",
    author: "Rist Wubrist",
    authorId: "u1",
    tags: ["code-review", "best-practices", "teamwork"],
    points: 15,
    createdAt: "2025-04-10",
    status: "approved",
  },
  {
    id: "kp2",
    title: "How to Onboard New Team Members Efficiently",
    content: "Create a structured 30-60-90 day plan. Pair new hires with a buddy. Document all tribal knowledge in the wiki. Schedule weekly 1:1s during the first month. Provide access to all tools on day one. Record onboarding sessions for future reference.",
    author: "Wubrist Admin",
    authorId: "u2",
    tags: ["onboarding", "management", "culture"],
    points: 20,
    createdAt: "2025-04-08",
    status: "approved",
  },
  {
    id: "kp3",
    title: "Mastering Git Branching Strategies",
    content: "Use feature branches with descriptive names. Rebase before merging to keep history clean. Squash commits for small features. Use conventional commit messages. Set up branch protection rules for main/develop branches.",
    author: "Rist Wubrist",
    authorId: "u1",
    tags: ["git", "workflow", "devops"],
    points: 12,
    createdAt: "2025-04-05",
    status: "approved",
  },
  {
    id: "kp4",
    title: "Effective Stand-up Meeting Tips",
    content: "Keep it under 15 minutes. Focus on blockers, not status updates. Use async stand-ups for remote teams. Track action items after each meeting.",
    author: "Rist Wubrist",
    authorId: "u1",
    tags: ["agile", "meetings", "productivity"],
    points: 8,
    createdAt: "2025-04-12",
    status: "pending",
  },
];
