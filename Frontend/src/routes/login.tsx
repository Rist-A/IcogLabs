import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { FloatingOrbs } from "../components/FloatingOrbs";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    navigate({ to: "/dashboard" });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 800));
    const result = login(email, password);
    setLoading(false);
    if (result.success) {
      navigate({ to: "/dashboard" });
    } else {
      setError(result.error || "Login failed");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      <FloatingOrbs />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card relative z-10 w-full max-w-2xl p-10"
      >
        <div className="mb-8 text-center">
          <motion.div
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 neon-glow-primary"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-3xl">⚡</span>
          </motion.div>
          <h1 className="font-display text-2xl font-bold tracking-wider text-gradient-primary">
            ICOG Knowledge Hub
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to access the knowledge base</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted-foreground">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-muted-foreground">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-destructive">
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:neon-glow-primary disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>⏳</motion.span>
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
// import { createFileRoute, useNavigate } from "@tanstack/react-router";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { useAuth } from "../context/AuthContext";
// import { FloatingOrbs } from "../components/FloatingOrbs";

// export const Route = createFileRoute("/login")({
//   component: LoginPage,
// });

// function LoginPage() {
//   const { login, user } = useAuth();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   if (user) {
//     navigate({ to: "/dashboard" });
//     return null;
//   }
// // In login.tsx
// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setLoading(true);
//   setError("");
//   await new Promise((r) => setTimeout(r, 800));
//   const result = login(email, password);
//   setLoading(false);
//   if (result.success) {
//     navigate({ to: "/dashboard" }); // This should be "/dashboard"
//   } else {
//     setError(result.error || "Login failed");
//   }
// };

//   return (
//     <div className="relative flex min-h-screen items-center justify-center px-4">
//       <FloatingOrbs />
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="glass-card relative z-10 w-full max-w-2xl p-10"
//       >
//         <div className="mb-8 text-center">
//           <motion.div
//             className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 neon-glow-primary"
//             animate={{ scale: [1, 1.05, 1] }}
//             transition={{ duration: 3, repeat: Infinity }}
//           >
//             <span className="text-3xl">⚡</span>
//           </motion.div>
//           <h1 className="font-display text-2xl font-bold tracking-wider text-gradient-primary">
//             ICOG Knowledge Hub
//           </h1>
//           <p className="mt-2 text-sm text-muted-foreground">Sign in to access the knowledge base</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="mb-1.5 block text-sm font-medium text-muted-foreground">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full rounded-lg bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
//               placeholder="Enter your email"
//               required
//             />
//           </div>
//           <div>
//             <label className="mb-1.5 block text-sm font-medium text-muted-foreground">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full rounded-lg bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
//               placeholder="Enter your password"
//               required
//             />
//           </div>

//           {error && (
//             <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-destructive">
//               {error}
//             </motion.p>
//           )}

//           <motion.button
//             type="submit"
//             disabled={loading}
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:neon-glow-primary disabled:opacity-50"
//           >
//             {loading ? (
//               <span className="flex items-center justify-center gap-2">
//                 <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>⏳</motion.span>
//                 Signing in...
//               </span>
//             ) : (
//               "Sign In"
//             )}
//           </motion.button>
//         </form>

        
//       </motion.div>
//     </div>
//   );
// }
