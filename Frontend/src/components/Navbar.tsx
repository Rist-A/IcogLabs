// import { Link, useLocation } from "@tanstack/react-router";
// import { useAuth } from "../context/AuthContext";
// import { motion } from "framer-motion";
// import { useState, useRef, useEffect } from "react";
// const navLinks = [

//   //{ to: "/dashboard/categories" as const, label: "Categories" },
//   { to: "/dashboard/profile" as const, label: "Profile" },
// ];

// export function Navbar() {
//   const { user, logout, isAdmin } = useAuth();
//   const location = useLocation();
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//    useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Get initials from user name
//   const getInitials = (name: string) => {
//     return name
//       .split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase()
//       .slice(0, 2);
//   };
//   return (
//     <motion.nav
//       initial={{ y: -20, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       className="glass-strong sticky top-0 z-50 px-6 py-3"
//     >
//       <div className="mx-auto flex max-w-7xl items-center justify-between">
//         <Link to="/dashboard" className="flex items-center gap-2">
//           <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20 neon-glow-primary">
//             <span className="text-lg font-bold text-primary">⚡</span>
//           </div>
//           <span className="font-display text-sm font-bold tracking-wider text-gradient-primary">
//             ICOG Knowledge Hub
//           </span>
//         </Link>

//         <div className="flex items-center gap-1">
//            <Link
//             to="/dashboard/categories"
//             className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
//               location.pathname.startsWith("/dashboard/categories") 
//                 ? "text-foreground" 
//                 : "text-muted-foreground hover:text-foreground"
//             }`}
//           >
//             Categories
//             {location.pathname.startsWith("/dashboard/categories") && (
//               <motion.div
//                 layoutId="nav-indicator"
//                 className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-primary"
//                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
//               />
//             )}
//           </Link>
//           {navLinks.map((link) => {
//             const isActive = location.pathname === link.to || location.pathname.startsWith(link.to + "/");
//             return (
//               <Link
//                 key={link.to}
//                 to={link.to}
//                 className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
//                   isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
//                 }`}
//               >
//                 {link.label}
//                 {isActive && (
//                   <motion.div
//                     layoutId="nav-indicator"
//                     className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-primary"
//                     transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                   />
//                 )}
//               </Link>
//             );
//           })}
//           {isAdmin && (
//             <Link
//               to="/dashboard/admin"
//               className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
//                 location.pathname.startsWith("/dashboard/admin") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
//               }`}
//             >
//               Admin
//               {location.pathname.startsWith("/dashboard/admin") && (
//                 <motion.div
//                   layoutId="nav-indicator"
//                   className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-primary"
//                   transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                 />
//               )}
//             </Link>
//           )}
//         </div>
        

//         <div className="flex items-center gap-3">
//           <div className="flex items-center gap-2">
//             <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
//               {user?.avatar}
//             </div>
//             <span className="text-sm text-muted-foreground">{user?.name}</span>
//           </div>
//           <button
//             onClick={logout}
//             className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-glass-hover hover:text-foreground"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </motion.nav>
//   );
// }
// import { Link, useLocation } from "@tanstack/react-router";
// import { useAuth } from "../context/AuthContext";
// import { motion } from "framer-motion";
// import { useState, useRef, useEffect } from "react";

// // Categories is now the default, so removed from navLinks
// const navLinks = [
//   { to: "/dashboard/profile" as const, label: "Profile" },
// ];

// export function Navbar() {
//   const { user, logout, isAdmin } = useAuth();
//   const location = useLocation();
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Get initials from user name
//   const getInitials = (name: string) => {
//     return name
//       .split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase()
//       .slice(0, 2);
//   };

//   return (
//     <motion.nav
//       initial={{ y: -20, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       className="glass-strong sticky top-0 z-50 px-6 py-3"
//     >
//       <div className="mx-auto flex max-w-7xl items-center justify-between">
//         <Link to="/dashboard" className="flex items-center gap-2">
//           <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20 neon-glow-primary">
//             <span className="text-lg font-bold text-primary">⚡</span>
//           </div>
//           <span className="font-display text-sm font-bold tracking-wider text-gradient-primary">
//             ICOG Knowledge Hub
//           </span>
//         </Link>

//         <div className="flex items-center gap-1">
//           {/* Categories is now the default - always visible without being in navLinks */}
//           <Link
//             to="/dashboard/categories"
//             className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
//               location.pathname.startsWith("/dashboard/categories") 
//                 ? "text-foreground" 
//                 : "text-muted-foreground hover:text-foreground"
//             }`}
//           >
//             Categories
//             {location.pathname.startsWith("/dashboard/categories") && (
//               <motion.div
//                 layoutId="nav-indicator"
//                 className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-primary"
//                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
//               />
//             )}
//           </Link>
          
//           {/* Profile link - visible in navigation */}
//           {navLinks.map((link) => {
//             const isActive = location.pathname === link.to || location.pathname.startsWith(link.to + "/");
//             return (
//               <Link
//                 key={link.to}
//                 to={link.to}
//                 className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
//                   isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
//                 }`}
//               >
//                 {link.label}
//                 {isActive && (
//                   <motion.div
//                     layoutId="nav-indicator"
//                     className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-primary"
//                     transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                   />
//                 )}
//               </Link>
//             );
//           })}
          
//           {isAdmin && (
//             <Link
//               to="/dashboard/admin"
//               className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
//                 location.pathname.startsWith("/dashboard/admin") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
//               }`}
//             >
//               Admin
//               {location.pathname.startsWith("/dashboard/admin") && (
//                 <motion.div
//                   layoutId="nav-indicator"
//                   className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-primary"
//                   transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                 />
//               )}
//             </Link>
//           )}
//         </div>

//         {/* Avatar with dropdown menu */}
//         <div className="relative" ref={dropdownRef}>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//             className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary transition-all hover:bg-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/50"
//           >
//             {user?.avatar || getInitials(user?.name || "User")}
//           </motion.button>

//           {/* Dropdown menu */}
//           {isDropdownOpen && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               className="absolute right-0 mt-2 w-48 rounded-lg glass-card py-2 shadow-lg"
//             >
//               <div className="border-b border-glass-border px-4 py-2">
//                 <p className="text-sm font-medium text-foreground">{user?.name}</p>
//                 <p className="text-xs text-muted-foreground">{user?.email}</p>
//               </div>
              
//               <Link
//                 to="/dashboard/profile"
//                 onClick={() => setIsDropdownOpen(false)}
//                 className="flex w-full items-center gap-2 px-4 py-2 text-sm text-foreground transition-colors hover:bg-glass-hover"
//               >
//                 <span>👤</span> Profile
//               </Link>
              
//               <button
//                 onClick={() => {
//                   setIsDropdownOpen(false);
//                   logout();
//                 }}
//                 className="flex w-full items-center gap-2 px-4 py-2 text-sm text-destructive transition-colors hover:bg-glass-hover"
//               >
//                 <span>🚪</span> Logout
//               </button>
//             </motion.div>
//           )}
//         </div>
//       </div>
//     </motion.nav>
//   );
// }
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

export function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const homeRoute = isAdmin
  ? "/dashboard/admin"
  : "/dashboard/categories";
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get initials from user name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Check if we're on profile page to show back button
  const isProfilePage = location.pathname === "/dashboard/profile";

  const handleLogout = () => {
    toast.custom((t) => (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="rounded-xl shadow-2xl p-6 max-w-md mx-auto"
        style={{
          background: "oklch(0.18 0.03 260 / 95%)",
          border: "1px solid oklch(1 0 0 / 15%)",
          backdropFilter: "blur(24px)",
        }}
      >
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/20">
            <span className="text-2xl">🚪</span>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground">Confirm Logout</h3>
            <p className="text-base text-muted-foreground mt-1">Are you sure you want to logout?</p>
          </div>
        </div>
        <div className="mt-6 flex gap-3 justify-end">
          <button
            onClick={() => toast.dismiss(t)}
            className="rounded-lg px-5 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              toast.dismiss(t);
              logout();
              toast.success("Successfully logged out!", {
                duration: 3000,
                icon: "👋",
                style: {
                  fontSize: "1rem",
                  padding: "1rem 1.5rem",
                },
              });
              navigate({ to: "/login" });
            }}
            className="rounded-lg bg-destructive px-5 py-2.5 text-base font-semibold text-destructive-foreground transition-colors hover:bg-destructive/80"
          >
            Logout
          </button>
        </div>
      </motion.div>
    ), {
      duration: 5000,
      position: "top-center",
    });
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass-strong sticky top-0 z-50 px-8 py-5"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        
        <Link to={homeRoute} className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20 neon-glow-primary">
            <span className="text-3xl font-bold text-primary">⚡</span>
          </div>
          <span className="font-display text-xl font-bold tracking-wider text-gradient-primary">
            ICOG LABS Knowledge Hub
          </span>
        </Link>

        {/* Show back button when on profile page */}
        {isProfilePage && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate({ to: homeRoute})}
            className="flex items-center gap-2 rounded-lg bg-primary/10 px-6 py-3 text-lg font-medium text-primary transition-all hover:bg-primary/20"
          >
            <span className="text-xl">←</span> Back to Home
          </motion.button>
        )}

        {/* Admin link - only visible for admins, no text label just icon */}
        {isAdmin && !isProfilePage && (
          <Link
            to="/dashboard/admin"
            className={`relative rounded-lg p-3 transition-colors ${
              location.pathname.startsWith("/dashboard/admin") 
                ? "text-primary" 
                : "text-muted-foreground hover:text-foreground"
            }`}
            title="Admin Panel"
          >
           
            {location.pathname.startsWith("/dashboard/admin") && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-primary"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </Link>
        )}

        {/* Avatar with dropdown menu */}
        <div className="relative" ref={dropdownRef}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-lg font-bold text-primary transition-all hover:bg-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {user?.avatar || getInitials(user?.name || "User")}
          </motion.button>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-3 w-64 rounded-xl glass-card py-2 shadow-xl"
            >
              <div className="border-b border-glass-border px-5 py-4">
                <p className="text-lg font-semibold text-foreground">{user?.name}</p>
                <p className="text-base text-muted-foreground mt-1">{user?.email}</p>
              </div>
              
              <Link
                to="/dashboard/profile"
                onClick={() => setIsDropdownOpen(false)}
                className="flex w-full items-center gap-3 px-5 py-3 text-lg text-foreground transition-colors hover:bg-glass-hover"
              >
                <span className="text-xl">👤</span> Profile
              </Link>
              
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  handleLogout();
                }}
                className="flex w-full items-center gap-3 px-5 py-3 text-lg text-destructive transition-colors hover:bg-glass-hover"
              >
                <span className="text-xl"></span> Logout
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}