import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";

export const Route = createFileRoute("/dashboard/admin")({
  component: AdminPage,
});

function AdminPage() {
  const { isAdmin } = useAuth();
  const [tab, setTab] = useState<"posts" | "bugs" | "interviews" | "users" | "analytics">("posts");

  // Redirect to categories if not admin - ADD THIS BACK
  if (!isAdmin) {
    return <Navigate to="/dashboard/categories" />;
  }

  const tabs = [
    { id: "posts" as const, label: "Knowledge Approval", icon: "📝" },
    { id: "bugs" as const, label: "Bug Review", icon: "🐞" },
    { id: "interviews" as const, label: "Interview Upload", icon: "🎥" },
    { id: "users" as const, label: "User Management", icon: "👥" },
    { id: "analytics" as const, label: "Analytics", icon: "📊" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">🛡 Admin Dashboard</h1>
        <div className="glass-card px-5 py-2.5">
          <span className="text-base text-muted-foreground">Admin Access Only</span>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        {tabs.map((t) => (
          <motion.button
            key={t.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTab(t.id)}
            className={`rounded-lg px-6 py-3 text-base font-medium transition-all ${
              tab === t.id ? "bg-primary text-primary-foreground neon-glow-primary" : "glass text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="text-xl mr-2">{t.icon}</span> {t.label}
          </motion.button>
        ))}
      </div>

      {tab === "posts" && <PostApproval />}
      {tab === "bugs" && <BugReview />}
      {tab === "interviews" && <InterviewUpload />}
      {tab === "users" && <UserManagement />}
      {tab === "analytics" && <Analytics />}
    </motion.div>
  );
}

// Rest of your components remain the same...
function PostApproval() {
  const { posts, approvePost, rejectPost } = useData();
  const pending = posts.filter((p) => p.status === "pending");

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Pending Knowledge Posts</h2>
        <span className="rounded-full bg-primary/20 px-4 py-1.5 text-base font-medium text-primary">{pending.length} pending</span>
      </div>
      {pending.length === 0 && (
        <div className="glass-card p-10 text-center">
          <span className="text-5xl">✅</span>
          <p className="mt-3 text-base text-muted-foreground">No pending posts to review.</p>
        </div>
      )}
      <div className="grid gap-5">
        {pending.map((post) => (
          <div key={post.id} className="glass-card p-7">
            <h3 className="text-xl font-semibold text-foreground">{post.title}</h3>
            <p className="mt-2 text-base text-muted-foreground">{post.content}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">{tag}</span>
              ))}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Submitted by: {post.author}</p>
            <div className="mt-5 flex gap-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => approvePost(post.id)}
                className="rounded-lg bg-accent/20 px-6 py-2.5 text-base font-medium text-accent transition-colors hover:bg-accent/30"
              >
                ✅ Approve (+10 points)
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => rejectPost(post.id)}
                className="rounded-lg bg-destructive/20 px-6 py-2.5 text-base font-medium text-destructive transition-colors hover:bg-destructive/30"
              >
                ❌ Reject
              </motion.button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function BugReview() {
  const { bugs, approveBug, rejectBug } = useData();
  const pending = bugs.filter((b) => b.status === "pending");

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Pending Bug Reports</h2>
        <span className="rounded-full bg-secondary/20 px-4 py-1.5 text-base font-medium text-secondary">{pending.length} pending</span>
      </div>
      {pending.length === 0 && (
        <div className="glass-card p-10 text-center">
          <span className="text-5xl">✅</span>
          <p className="mt-3 text-base text-muted-foreground">No pending bug reports to review.</p>
        </div>
      )}
      <div className="grid gap-5">
        {pending.map((bug) => (
          <div key={bug.id} className="glass-card p-7">
            <h3 className="text-xl font-semibold text-foreground">{bug.title}</h3>
            {bug.description && <p className="mt-2 text-base text-muted-foreground">{bug.description}</p>}
            <pre className="mt-3 max-h-40 overflow-auto rounded-lg bg-surface p-4 text-sm font-mono text-neon-cyan">{bug.buggyCode}</pre>
            <pre className="mt-3 max-h-40 overflow-auto rounded-lg bg-surface p-4 text-sm font-mono text-neon-green">{bug.solution}</pre>
            <p className="mt-3 text-sm text-muted-foreground">Submitted by: {bug.author}</p>
            <div className="mt-5 flex gap-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => approveBug(bug.id)}
                className="rounded-lg bg-accent/20 px-6 py-2.5 text-base font-medium text-accent transition-colors hover:bg-accent/30"
              >
                ✅ Approve (+15 points)
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => rejectBug(bug.id)}
                className="rounded-lg bg-destructive/20 px-6 py-2.5 text-base font-medium text-destructive transition-colors hover:bg-destructive/30"
              >
                ❌ Reject
              </motion.button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function InterviewUpload() {
  const { addInterview } = useData();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !url) return;
    addInterview({ 
      employeeName: name, 
      role, 
      videoUrl: url, 
      thumbnail: "", 
      summary, 
      date: new Date().toISOString().split("T")[0] 
    });
    setName(""); 
    setRole(""); 
    setUrl(""); 
    setSummary("");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <form onSubmit={handleSubmit} className="glass-card max-w-3xl space-y-6 p-8">
        <h2 className="text-2xl font-semibold text-foreground">Upload Exit Interview</h2>
        <div className="space-y-5">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Employee name"
            className="w-full rounded-lg bg-input px-6 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            required
          />
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Role (e.g., Senior Frontend Developer)"
            className="w-full rounded-lg bg-input px-6 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="YouTube embed URL (e.g., https://www.youtube.com/embed/...)"
            className="w-full rounded-lg bg-input px-6 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            required
          />
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Interview summary - key insights from the exit interview"
            rows={5}
            className="w-full rounded-lg bg-input px-6 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-lg bg-primary px-10 py-3.5 text-base font-semibold text-primary-foreground"
        >
          Upload Interview
        </motion.button>
      </form>
    </motion.div>
  );
}

function UserManagement() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setName(""); 
    setEmail(""); 
    setPassword(""); 
    setRole("user");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <form onSubmit={handleSubmit} className="glass-card max-w-3xl space-y-6 p-8">
        <h2 className="text-2xl font-semibold text-foreground">Create New User</h2>
        <div className="space-y-5">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="w-full rounded-lg bg-input px-6 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            required
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            type="email"
            className="w-full rounded-lg bg-input px-6 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="w-full rounded-lg bg-input px-6 py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full rounded-lg bg-input px-6 py-3.5 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="user">Standard User</option>
            <option value="admin">Administrator</option>
          </select>
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-lg bg-primary px-10 py-3.5 text-base font-semibold text-primary-foreground"
        >
          Create User
        </motion.button>
      </form>
    </motion.div>
  );
}

function Analytics() {
  const { posts, bugs, interviews, users } = useData();
  const approved = posts.filter((p) => p.status === "approved").length;
  const rejected = posts.filter((p) => p.status === "rejected").length;
  const pending = posts.filter((p) => p.status === "pending").length;
  const approvedBugs = bugs.filter((b) => b.status === "approved").length;
  const totalPoints = posts.reduce((sum, p) => sum + (p.points || 0), 0);

  const analyticsCards = [
    { label: "Total Users", value: users?.length || 2, icon: "👥" },
    { label: "Total Posts", value: posts.length, icon: "📝" },
    { label: "Approved Posts", value: approved, icon: "✅" },
    { label: "Rejected Posts", value: rejected, icon: "❌" },
    { label: "Pending Posts", value: pending, icon: "⏳" },
    { label: "Total Bugs", value: bugs.length, icon: "🐞" },
    { label: "Approved Bugs", value: approvedBugs, icon: "✅" },
    { label: "Total Points Given", value: totalPoints, icon: "⭐" },
    { label: "Interviews", value: interviews.length, icon: "🎥" },
  ];

  const leaderboard = [
    { name: "Rist Wubrist", points: 120, role: "user" },
    { name: "John Doe", points: 95, role: "user" },
    { name: "Jane Smith", points: 75, role: "user" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-7">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {analyticsCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="glass-card p-6 text-center"
          >
            <span className="text-4xl">{card.icon}</span>
            <p className="mt-2 text-4xl font-bold text-foreground">{card.value}</p>
            <p className="text-base text-muted-foreground mt-1">{card.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-7 md:grid-cols-2">
        <div className="glass-card p-7">
          <h3 className="mb-5 text-2xl font-semibold text-foreground">🏆 Points Leaderboard</h3>
          <div className="space-y-4">
            {leaderboard.map((user, i) => (
              <div key={user.name} className="flex items-center justify-between rounded-lg bg-surface/50 p-4">
                <div className="flex items-center gap-4">
                  <span className="text-xl font-bold text-primary">#{i + 1}</span>
                  <span className="text-lg font-medium text-foreground">{user.name}</span>
                </div>
                <span className="text-lg font-bold text-accent">{user.points} pts</span>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-lg bg-primary/10 p-4 text-center">
            <p className="text-base text-muted-foreground">✨ Admins don't earn points - they're here to support the community!</p>
          </div>
        </div>

        <div className="glass-card p-7">
          <h3 className="mb-5 text-2xl font-semibold text-foreground">📊 Platform Activity</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-base text-muted-foreground">Approval Rate</span>
              <span className="text-xl font-bold text-accent">{Math.round((approved / (approved + rejected)) * 100)}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-surface">
              <div className="h-full rounded-full bg-accent" style={{ width: `${(approved / (approved + rejected)) * 100}%` }} />
            </div>
            <div className="flex justify-between items-center mt-5">
              <span className="text-base text-muted-foreground">Community Engagement</span>
              <span className="text-xl font-bold text-primary">{posts.length + bugs.length} contributions</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-base text-muted-foreground">Active Users</span>
              <span className="text-xl font-bold text-primary">{users?.length || 2}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-7">
        <h3 className="mb-5 text-2xl font-semibold text-foreground">🐞 Weekly Bug Reports (Mock Data)</h3>
        <div className="flex items-end gap-3 h-48">
          {[65, 40, 85, 30, 55, 70, 45].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              className="flex-1 rounded-t-lg bg-gradient-to-t from-primary to-secondary"
            />
          ))}
        </div>
        <div className="mt-4 flex justify-between text-base text-muted-foreground">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
        <p className="mt-5 text-center text-sm text-muted-foreground">Bug report frequency over the last 7 days</p>
      </div>
    </motion.div>
  );
}
// import { createFileRoute, Navigate } from "@tanstack/react-router";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { useAuth } from "../context/AuthContext";
// import { useData } from "../context/DataContext";

// export const Route = createFileRoute("/dashboard/admin")({
//   component: AdminPage,
// });

// function AdminPage() {
//   const { isAdmin } = useAuth();
//   const [tab, setTab] = useState<"posts" | "bugs" | "interviews" | "users" | "analytics">("posts");

//   if (!isAdmin) return <Navigate to="/dashboard/admin" />;

//   const tabs = [
//     { id: "posts" as const, label: "Knowledge Approval", icon: "📝" },
//     { id: "bugs" as const, label: "Bug Review", icon: "🐞" },
//     { id: "interviews" as const, label: "Interview Upload", icon: "🎥" },
//     { id: "users" as const, label: "User Management", icon: "👥" },
//     { id: "analytics" as const, label: "Analytics", icon: "📊" },
//   ];

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//       <h1 className="mb-6 text-2xl font-bold text-foreground">🛡 Admin Dashboard</h1>

//       <div className="mb-6 flex flex-wrap gap-2">
//         {tabs.map((t) => (
//           <motion.button
//             key={t.id}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => setTab(t.id)}
//             className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
//               tab === t.id ? "bg-primary text-primary-foreground neon-glow-primary" : "glass text-muted-foreground hover:text-foreground"
//             }`}
//           >
//             {t.icon} {t.label}
//           </motion.button>
//         ))}
//       </div>

//       {tab === "posts" && <PostApproval />}
//       {tab === "bugs" && <BugReview />}
//       {tab === "interviews" && <InterviewUpload />}
//       {tab === "users" && <UserManagement />}
//       {tab === "analytics" && <Analytics />}
//     </motion.div>
//   );
// }

// function PostApproval() {
//   const { posts, approvePost, rejectPost } = useData();
//   const pending = posts.filter((p) => p.status === "pending");

//   return (
//     <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
//       <h2 className="text-lg font-semibold text-foreground">Pending Knowledge Posts ({pending.length})</h2>
//       {pending.length === 0 && <p className="text-sm text-muted-foreground">No pending posts.</p>}
//       {pending.map((post) => (
//         <div key={post.id} className="glass-card p-5">
//           <h3 className="font-semibold text-foreground">{post.title}</h3>
//           <p className="mt-1 text-sm text-muted-foreground">{post.content}</p>
//           <p className="mt-2 text-xs text-muted-foreground">by {post.author}</p>
//           <div className="mt-3 flex gap-2">
//             <motion.button whileTap={{ scale: 0.95 }} onClick={() => approvePost(post.id)} className="rounded-lg bg-accent/20 px-4 py-1.5 text-sm font-medium text-accent hover:bg-accent/30">✅ Approve</motion.button>
//             <motion.button whileTap={{ scale: 0.95 }} onClick={() => rejectPost(post.id)} className="rounded-lg bg-destructive/20 px-4 py-1.5 text-sm font-medium text-destructive hover:bg-destructive/30">❌ Reject</motion.button>
//           </div>
//         </div>
//       ))}
//     </motion.div>
//   );
// }

// function BugReview() {
//   const { bugs, approveBug, rejectBug } = useData();
//   const pending = bugs.filter((b) => b.status === "pending");

//   return (
//     <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
//       <h2 className="text-lg font-semibold text-foreground">Pending Bug Reports ({pending.length})</h2>
//       {pending.length === 0 && <p className="text-sm text-muted-foreground">No pending bugs.</p>}
//       {pending.map((bug) => (
//         <div key={bug.id} className="glass-card p-5">
//           <h3 className="font-semibold text-foreground">{bug.title}</h3>
//           <pre className="mt-2 max-h-32 overflow-auto rounded-lg bg-surface p-3 text-xs font-mono text-neon-cyan">{bug.buggyCode}</pre>
//           <p className="mt-2 text-xs text-muted-foreground">by {bug.author}</p>
//           <div className="mt-3 flex gap-2">
//             <motion.button whileTap={{ scale: 0.95 }} onClick={() => approveBug(bug.id)} className="rounded-lg bg-accent/20 px-4 py-1.5 text-sm font-medium text-accent hover:bg-accent/30">✅ Approve</motion.button>
//             <motion.button whileTap={{ scale: 0.95 }} onClick={() => rejectBug(bug.id)} className="rounded-lg bg-destructive/20 px-4 py-1.5 text-sm font-medium text-destructive hover:bg-destructive/30">❌ Reject</motion.button>
//           </div>
//         </div>
//       ))}
//     </motion.div>
//   );
// }

// function InterviewUpload() {
//   const { addInterview } = useData();
//   const [name, setName] = useState("");
//   const [role, setRole] = useState("");
//   const [url, setUrl] = useState("");
//   const [summary, setSummary] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!name || !url) return;
//     addInterview({ employeeName: name, role, videoUrl: url, thumbnail: "", summary, date: new Date().toISOString().split("T")[0] });
//     setName(""); setRole(""); setUrl(""); setSummary("");
//   };

//   return (
//     <motion.form initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="glass-card max-w-lg space-y-4 p-6">
//       <h2 className="text-lg font-semibold text-foreground">Upload Exit Interview</h2>
//       <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Employee name" className="w-full rounded-lg bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" required />
//       <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" className="w-full rounded-lg bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
//       <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="YouTube embed URL" className="w-full rounded-lg bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" required />
//       <textarea value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Interview summary" rows={3} className="w-full rounded-lg bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
//       <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground">
//         Upload Interview
//       </motion.button>
//     </motion.form>
//   );
// }

// function UserManagement() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("user");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setName(""); setEmail(""); setPassword(""); setRole("user");
//   };

//   return (
//     <motion.form initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="glass-card max-w-lg space-y-4 p-6">
//       <h2 className="text-lg font-semibold text-foreground">Create New User</h2>
//       <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full rounded-lg bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" required />
//       <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" className="w-full rounded-lg bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" required />
//       <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full rounded-lg bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" required />
//       <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full rounded-lg bg-input px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
//         <option value="user">User</option>
//         <option value="admin">Admin</option>
//       </select>
//       <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground">
//         Create User
//       </motion.button>
//     </motion.form>
//   );
// }

// function Analytics() {
//   const { posts, bugs } = useData();
//   const approved = posts.filter((p) => p.status === "approved").length;
//   const rejected = posts.filter((p) => p.status === "rejected").length;
//   const pending = posts.filter((p) => p.status === "pending").length;

//   const leaderboard = [
//     { name: "Wubrist Admin", points: 350 },
//     { name: "Rist Wubrist", points: 120 },
//   ];

//   const analyticsCards = [
//     { label: "Total Users", value: 2, icon: "👥" },
//     { label: "Total Posts", value: posts.length, icon: "📝" },
//     { label: "Approved", value: approved, icon: "✅" },
//     { label: "Rejected", value: rejected, icon: "❌" },
//     { label: "Pending", value: pending, icon: "⏳" },
//     { label: "Total Bugs", value: bugs.length, icon: "🐞" },
//   ];

//   return (
//     <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
//       <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
//         {analyticsCards.map((card, i) => (
//           <motion.div
//             key={card.label}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.05 }}
//             className="glass-card p-4 text-center"
//           >
//             <span className="text-2xl">{card.icon}</span>
//             <p className="mt-1 text-2xl font-bold text-foreground">{card.value}</p>
//             <p className="text-xs text-muted-foreground">{card.label}</p>
//           </motion.div>
//         ))}
//       </div>

//       <div className="glass-card p-6">
//         <h3 className="mb-4 text-lg font-semibold text-foreground">🏆 Points Leaderboard</h3>
//         <div className="space-y-3">
//           {leaderboard.map((user, i) => (
//             <div key={user.name} className="flex items-center justify-between rounded-lg bg-surface/50 p-3">
//               <div className="flex items-center gap-3">
//                 <span className="text-lg font-bold text-primary">#{i + 1}</span>
//                 <span className="text-sm font-medium text-foreground">{user.name}</span>
//               </div>
//               <span className="text-sm font-bold text-accent">{user.points} pts</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="glass-card p-6">
//         <h3 className="mb-4 text-lg font-semibold text-foreground">🐞 Bug Frequency (Mock)</h3>
//         <div className="flex items-end gap-2 h-32">
//           {[65, 40, 85, 30, 55, 70, 45].map((h, i) => (
//             <motion.div
//               key={i}
//               initial={{ height: 0 }}
//               animate={{ height: `${h}%` }}
//               transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
//               className="flex-1 rounded-t-lg bg-gradient-to-t from-primary to-secondary"
//             />
//           ))}
//         </div>
//         <div className="mt-2 flex justify-between text-xs text-muted-foreground">
//           {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
//             <span key={d}>{d}</span>
//           ))}
//         </div>
//       </div>
//     </motion.div>
//   );
// }
