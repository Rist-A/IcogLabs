import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export const Route = createFileRoute("/dashboard/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = useAuth();
  if (!user) return null;

  const stats = [
    { label: "Total Points", value: user.points, icon: "⭐" },
    { label: "Posts", value: user.postsCount, icon: "📝" },
    { label: "Bugs Submitted", value: user.bugsSubmitted, icon: "🐞" },
    { label: "Approved", value: user.bugsApproved, icon: "✅" },
    { label: "Rejected", value: user.bugsRejected, icon: "❌" },
  ];

  const level = user.points < 50 ? "Newcomer" : user.points < 100 ? "Contributor" : user.points < 300 ? "Expert" : "Legend";
  const progress = Math.min((user.points / 500) * 50, 50);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="glass-card mx-auto max-w-2xl p-8">
        <div className="flex flex-col items-center text-center">
          <motion.div
            className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/20 text-3xl font-bold text-primary neon-glow-primary"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {user.avatar}
          </motion.div>
          <h1 className="mt-4 text-2xl font-bold text-foreground">{user.name}</h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <span className="mt-2 rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary uppercase">
            {user.role}
          </span>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Contribution Level: <span className="text-foreground font-semibold">{level}</span></span>
            <span className="text-muted-foreground">{user.points}/500</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
            />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="rounded-xl bg-surface/50 p-4 text-center"
            >
              <span className="text-2xl">{stat.icon}</span>
              <motion.p
                className="mt-1 text-2xl font-bold text-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                {stat.value}
              </motion.p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
