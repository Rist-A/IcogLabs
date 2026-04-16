// import { createFileRoute } from "@tanstack/react-router";
// import { motion } from "framer-motion";
// import { useAuth } from "../context/AuthContext";
// import { useData } from "../context/DataContext";

// export const Route = createFileRoute("/dashboard/categories")({
//   component: DashboardHome,
// });

// const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
// const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

// function DashboardHome() {
//   const { user, isAdmin } = useAuth();
//   const { posts, bugs, interviews } = useData();

//   const stats = [
//     { label: "Knowledge Posts", value: posts.filter((p) => p.status === "approved").length, icon: "🧠", color: "primary" },
//     { label: "Bug Fixes", value: bugs.filter((b) => b.status === "approved").length, icon: "🐞", color: "secondary" },
//     { label: "Exit Interviews", value: interviews.length, icon: "🎥", color: "accent" },
//     { label: "Your Points", value: user?.points ?? 0, icon: "⭐", color: "neon-green" },
//   ];

//   return (
//     <div>
//       <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
//         <h1 className="text-3xl font-bold text-foreground">
//           Welcome back, <span className="text-gradient-primary">{user?.name}</span>
//         </h1>
//         <p className="mt-1 text-muted-foreground">
//           {isAdmin ? "Admin Dashboard — manage the knowledge base" : "Explore and contribute to the knowledge base"}
//         </p>
//       </motion.div>

//       <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//         {stats.map((stat) => (
//           <motion.div
//             key={stat.label}
//             variants={item}
//             whileHover={{ scale: 1.03, y: -2 }}
//             className="glass-card p-5 cursor-default"
//           >
//             <div className="flex items-center justify-between">
//               <span className="text-2xl">{stat.icon}</span>
//               <motion.span
//                 className="text-3xl font-bold text-foreground"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.5 }}
//               >
//                 {stat.value}
//               </motion.span>
//             </div>
//             <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
//           </motion.div>
//         ))}
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.4 }}
//         className="mt-8 grid gap-6 lg:grid-cols-2"
//       >
//         <div className="glass-card p-6">
//           <h2 className="mb-4 text-lg font-semibold text-foreground">📝 Recent Knowledge</h2>
//           <div className="space-y-3">
//             {posts.filter((p) => p.status === "approved").slice(0, 3).map((post) => (
//               <div key={post.id} className="rounded-lg bg-surface/50 p-3">
//                 <h3 className="text-sm font-medium text-foreground">{post.title}</h3>
//                 <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{post.content}</p>
//                 <div className="mt-2 flex gap-1">
//                   {post.tags.slice(0, 2).map((tag) => (
//                     <span key={tag} className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">{tag}</span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="glass-card p-6">
//           <h2 className="mb-4 text-lg font-semibold text-foreground">🐞 Recent Bug Fixes</h2>
//           <div className="space-y-3">
//             {bugs.filter((b) => b.status === "approved").slice(0, 3).map((bug) => (
//               <div key={bug.id} className="rounded-lg bg-surface/50 p-3">
//                 <h3 className="text-sm font-medium text-foreground">{bug.title}</h3>
//                 <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{bug.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }
// src/routes/dashboard.categories.tsx (or wherever your categories component is)
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";

// This handles both /dashboard and /dashboard/categories
export const Route = createFileRoute("/dashboard/")({
  component: DashboardIndexWrapper,
});

function DashboardIndexWrapper() {
  const { user, isAdmin } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  // Redirect admins to admin dashboard
  if (isAdmin) {
    return <Navigate to="/dashboard/admin" />;
  }
  
  // Show categories page for regular users
return <Navigate to="/dashboard/categories" />;
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

function DashboardHome() {
  const { user } = useAuth();
  const { posts, bugs, interviews } = useData();

  const stats = [
    { label: "Knowledge Posts", value: posts.filter((p) => p.status === "approved").length, icon: "🧠", color: "primary" },
    { label: "Bug Fixes", value: bugs.filter((b) => b.status === "approved").length, icon: "🐞", color: "secondary" },
    { label: "Exit Interviews", value: interviews.length, icon: "🎥", color: "accent" },
    { label: "Your Points", value: user?.points ?? 0, icon: "⭐", color: "neon-green" },
  ];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, <span className="text-gradient-primary">{user?.name}</span>
        </h1>
        <p className="mt-1 text-muted-foreground">
          Explore and contribute to the knowledge base
        </p>
      </motion.div>

      {/* Rest of your component remains the same */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={item}
            whileHover={{ scale: 1.03, y: -2 }}
            className="glass-card p-5 cursor-default"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">{stat.icon}</span>
              <motion.span
                className="text-3xl font-bold text-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {stat.value}
              </motion.span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 grid gap-6 lg:grid-cols-2"
      >
        <div className="glass-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">📝 Recent Knowledge</h2>
          <div className="space-y-3">
            {posts.filter((p) => p.status === "approved").slice(0, 3).map((post) => (
              <div key={post.id} className="rounded-lg bg-surface/50 p-3">
                <h3 className="text-sm font-medium text-foreground">{post.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{post.content}</p>
                <div className="mt-2 flex gap-1">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">🐞 Recent Bug Fixes</h2>
          <div className="space-y-3">
            {bugs.filter((b) => b.status === "approved").slice(0, 3).map((bug) => (
              <div key={bug.id} className="rounded-lg bg-surface/50 p-3">
                <h3 className="text-sm font-medium text-foreground">{bug.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{bug.description || bug.lessonLearned}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}