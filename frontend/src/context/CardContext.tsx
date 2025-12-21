"use client";

import { AnalyticsResponse } from "@/types/instacard";
import { LinkCardProps } from "@/types/links";
import { createContext, useContext, useEffect, useRef, useState } from "react";

interface CardContextType {
  // links
  link: LinkCardProps[];
  setLink: React.Dispatch<React.SetStateAction<LinkCardProps[]>>;
  removeLink: (id: string) => void;
  reorderLinkById: (activeId: string, overId: string) => void;

  // theme
  template: string;
  setTemplate: (template: string) => void;

  layout: "column" | "grid";
  setLayout: (layout: "column" | "grid") => void;

  background: string;
  setBackground: (background: string) => void;

  wallpaper: string;
  setWallpaper: (wallpaper: string) => void;

  analytics: AnalyticsResponse | null;
  setAnalytics: (analytics: AnalyticsResponse | null) => void;

  loading: boolean;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export const CardProvider = ({ children }: { children: React.ReactNode }) => {
  // ===================== STATE =====================
  const [link, setLink] = useState<LinkCardProps[]>([]);

  const [template, setTemplate] = useState<string>("");
  const [layout, setLayout] = useState<"column" | "grid">("column");
  const [background, setBackground] = useState<string>("");
  const [wallpaper, setWallpaper] = useState<string>("");
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  // flag untuk menandai data awal sudah di-load
  const hasHydrated = useRef(false);

  // debounce autosave
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);

  // ===================== HYDRATE (THEME + LINKS) =====================
  useEffect(() => {
    async function hydrate() {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const [themeRes, linkRes] = await Promise.all([
          fetch("http://localhost:5000/api/themes", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:5000/api/links", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const themeData = await themeRes.json();
        const linkData = await linkRes.json();

        // set theme
        if (themeData?.template) setTemplate(themeData.template);
        if (themeData?.layout) setLayout(themeData.layout);
        if (themeData?.background) setBackground(themeData.background);
        if (themeData?.wallpaper) setWallpaper(themeData.wallpaper);

        // set links
        setLink(linkData ?? []);
      } catch (err) {
        console.error("Failed to hydrate card context", err);
      } finally {
        hasHydrated.current = true;
        setLoading(false);
      }
    }

    hydrate();
  }, []);

  // ===================== AUTOSAVE THEME =====================
  useEffect(() => {
    if (!hasHydrated.current) return;

    if (saveTimeout.current) clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        await fetch("http://localhost:5000/api/themes", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ template, layout, background, wallpaper }),
        });
      } catch (err) {
        console.error("Failed to autosave theme", err);
      }
    }, 500);

    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, [template, layout, background, wallpaper]);

  // ===================== LINK HELPERS =====================
  const removeLink = (id: string) => {
    setLink((prev) => prev.filter((item) => item.id !== id));
  };

  const reorderLinkById = (activeId: string, overId: string) => {
    setLink((prev) => {
      const oldIndex = prev.findIndex((i) => i.id === activeId);
      const newIndex = prev.findIndex((i) => i.id === overId);
      if (oldIndex === -1 || newIndex === -1) return prev;

      const updated = [...prev];
      const [moved] = updated.splice(oldIndex, 1);
      updated.splice(newIndex, 0, moved);
      return updated;
    });
  };

  // ===================== ANALYTICS =====================
  useEffect(() => {
    try {
      fetch("http://localhost:5000/api/analytics", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setAnalytics(data);
        });
    } catch (error) {
      console.error("Failed to fetch analytics", error);
    }
  }, []);

  // ===================== PROVIDER =====================
  return (
    <CardContext.Provider
      value={{
        link,
        setLink,
        removeLink,
        reorderLinkById,
        template,
        setTemplate,
        layout,
        setLayout,
        background,
        setBackground,
        wallpaper,
        setWallpaper,
        analytics,
        setAnalytics,
        loading,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export const useCard = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useCard must be used within a CardProvider");
  }
  return context;
};
