"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LoadingScreen from "../ui/LoadingScreen";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // redirect hanya di client setelah mount
    if (token === null) {
      router.replace("/signin");
    }
  }, [token, router]);

  // render hanya jika token ada, atau null sementara redirect
  if (!token) return <LoadingScreen />;

  return <>{children}</>;
}
