"use client";

import { LinkCardProps } from "@/types/links";
import { createContext, useContext, useEffect, useState } from "react";

interface CardSettingJSON {
  template: string;
  layout: "column" | "grid" | undefined;
  background: string;
}

interface CardContextType {
  link: LinkCardProps[];
  setLink: (link: LinkCardProps[]) => void;
  removeLink: (id: string) => void;
  reorderLinkById: (activeId: string, overId: string) => void;
  
  template: string;
  setTemplate: (template: string) => void;

  layout: "column" | "grid" | undefined;
  setLayout: (layout: "column" | "grid" | undefined) => void;

  background: string;
  setBackground: (background: string) => void;

  saveCardSettings: () => Promise<void>;
  loading: boolean;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export const CardProvider = ({ children }: { children: React.ReactNode }) => {
  const [link, setLink] = useState<LinkCardProps[]>([]);
  const [template, setTemplate] = useState<string>("");
  const [layout, setLayout] = useState<"column" | "grid" | undefined>("column");
  const [background, setBackground] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  // LOAD DATA DARI FIELD THEME (JSON)
useEffect(() => {
  async function loadTheme() {
    const token = localStorage.getItem("token");
    if (!token) return; // <- penting! jangan fetch kalau tidak login

    const res = await fetch("http://localhost:5000/api/themes", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (data.background) setBackground(data.background);
    if (data.template) setTemplate(data.template);
    if (data.layout) setLayout(data.layout);
  }

  loadTheme();
}, []);



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

  // SAVE KE BACKEND KE DALAM FIELD theme (String JSON)
  const saveCardSettings = async () => {
    setLoading(true);

    try {
      await fetch("http://localhost:5000/api/themes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ background, layout, template })
    }); 
    } catch (err) {
      console.error("Failed to save:", err);
    } finally {
      setLoading(false);
    }
  };

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
        saveCardSettings,
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
