import { createFileRoute, Outlet, Navigate, useRouterState } from "@tanstack/react-router";
import { useAuth } from "../context/AuthContext";
import { Navbar } from "../components/Navbar";
import { Chatbot } from "../components/Chatbot";
import { FloatingOrbs } from "../components/FloatingOrbs";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  const { user, isAdmin } = useAuth();
  const { location } = useRouterState();

  if (!user) {
    return <Navigate to="/login" />;
  }

  // 🔥 THIS is the missing piece
  if (location.pathname === "/dashboard") {
    if (isAdmin) {
      return <Navigate to="/dashboard/admin" />;
    }
    return <Navigate to="/dashboard/categories" />;
  }

  return (
    <div className="relative min-h-screen">
      <FloatingOrbs />
      <Navbar />
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-8">
        <Outlet />
      </main>
      <Chatbot />
    </div>
  );
}