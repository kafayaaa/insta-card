"use client";

import { useEffect, useRef } from "react";
import { useCard } from "@/context/CardContext";

export function useAutoSaveFontColor() {
  const { fontColor, fontFace, fontWeight } = useCard();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (fontColor === "") return;

    if (fontFace === "") return;

    if (fontWeight === "") return;

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
        body: JSON.stringify({ fontColor }),
      });
    }, 600);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [fontColor]);
}

export function useAutoSaveFontFace() {
  const { fontFace } = useCard();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (fontFace === "") return;

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
        body: JSON.stringify({ fontFace }),
      });
    }, 600);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [fontFace]);
}

export function useAutoSaveFontWeight() {
  const { fontWeight } = useCard();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (fontWeight === "") return;

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
        body: JSON.stringify({ fontWeight }),
      });
    }, 600);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [fontWeight]);
}
