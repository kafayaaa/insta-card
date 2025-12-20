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
        <div className="w-full h-screen md:min-h-screen flex flex-col-reverse md:flex-row bg-zinc-100 text-brand-black">
          <Sidebar />
          <WorkSpace>{children}</WorkSpace>
        </div>
      </ProtectedRoute>
    </CardProvider>
  );
}
