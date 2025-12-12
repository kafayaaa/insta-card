"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Sidebar from "@/components/layout/Sidebar";
import WorkSpace from "@/components/layout/WorkSpace";
import { CardProvider } from "@/context/CardContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <CardProvider>
    <ProtectedRoute>
        <div className="w-full min-h-screen flex bg-zinc-100 text-brand-black">
          <Sidebar />
          <WorkSpace>{children}</WorkSpace>
        </div>
    </ProtectedRoute>
      </CardProvider>
  );
}
