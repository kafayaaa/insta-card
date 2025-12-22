"use client";

import { useEffect, useRef } from "react";
import { useCard } from "@/context/CardContext";

export function useAutoSaveImgWallpaper() {
  const { imgWallpaper } = useCard();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (imgWallpaper === "") return;

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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ imgWallpaper }),
      });
    }, 600);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [imgWallpaper]);
}
