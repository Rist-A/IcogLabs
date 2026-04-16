export interface BugReport {
  id: string;
  title: string;
  description: string;
  buggyCode: string;
  solution: string;
  lessonLearned: string;
  author: string;
  authorId: string;
  status: "approved" | "pending" | "rejected";
  createdAt: string;
}

export const bugReports: BugReport[] = [
  {
    id: "b1",
    title: "React useEffect Infinite Loop",
    description: "Component re-renders infinitely when setting state inside useEffect without proper dependency array.",
    buggyCode: `useEffect(() => {
  const data = fetchData();
  setItems(data);
  // Missing dependency array causes infinite loop
});`,
    solution: `useEffect(() => {
  const data = fetchData();
  setItems(data);
}, []); // Add empty dependency array
// Or add specific dependencies: [someValue]`,
    lessonLearned: "Always specify a dependency array in useEffect. An empty array [] runs the effect only once on mount. Omitting it causes the effect to run after every render.",
    author: "Rist Wubrist",
    authorId: "u1",
    status: "approved",
    createdAt: "2025-04-09",
  },
  {
    id: "b2",
    title: "TypeScript Optional Chaining Gotcha",
    description: "Accessing nested object properties without null checks causes runtime crashes in production.",
    buggyCode: `const userName = response.data.user.name;
// Crashes if response.data or user is undefined`,
    solution: `const userName = response?.data?.user?.name ?? 'Unknown';
// Safe with optional chaining and nullish coalescing`,
    lessonLearned: "Always use optional chaining (?.) when accessing nested properties from API responses. Combine with nullish coalescing (??) for default values.",
    author: "Wubrist Admin",
    authorId: "u2",
    status: "approved",
    createdAt: "2025-04-07",
  },
  {
    id: "b3",
    title: "CSS Grid Layout Overflow on Mobile",
    description: "Grid items overflow on small screens when using fixed column widths.",
    buggyCode: `.grid-container {
  display: grid;
  grid-template-columns: 300px 300px 300px;
}`,
    solution: `.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}`,
    lessonLearned: "Use auto-fit with minmax() for responsive grids instead of fixed pixel widths. This ensures the grid adapts to any screen size.",
    author: "Rist Wubrist",
    authorId: "u1",
    status: "approved",
    createdAt: "2025-04-11",
  },
  {
    id: "b4",
    title: "Memory Leak in Event Listener",
    description: "Event listeners not cleaned up on component unmount causing memory leaks.",
    buggyCode: `useEffect(() => {
  window.addEventListener('resize', handleResize);
  // No cleanup!
}, []);`,
    solution: `useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);`,
    lessonLearned: "Always return a cleanup function from useEffect when adding event listeners, subscriptions, or timers.",
    author: "Wubrist Admin",
    authorId: "u2",
    status: "pending",
    createdAt: "2025-04-13",
  },
];
