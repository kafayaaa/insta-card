"use client";

import { useEffect, useRef } from "react";
import { useCard } from "@/context/CardContext";

export function useAutoSaveBackground() {
  const { background } = useCard();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (background === "") return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("NO TOKEN FOUND");
        return;
      }

      await fetch("http://localhost:5000/api/themes", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ background })
      });
    }, 600);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [background]);
}
