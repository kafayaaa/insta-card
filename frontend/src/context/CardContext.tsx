"use client";

import { LinkCardProps } from "@/types/links";
import { createContext, useContext, useState } from "react";

interface CardContextType {
  link: LinkCardProps[];
  setLink: (link: LinkCardProps[]) => void;
  removeLink: (index: string) => void;
  reorderLinkById: (activeId: string, overId: string) => void;
  template: string;
  setTemplate: (template: string) => void;
  layout: "column" | "grid" | undefined;
  setLayout: (layout: "column" | "grid" | undefined) => void;
  background: string;
  setBackground: (background: string) => void;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export const CardProvider = ({ children }: { children: React.ReactNode }) => {
  const [link, setLink] = useState<LinkCardProps[]>([]);
  const [template, setTemplate] = useState<string>("");
  const [layout, setLayout] = useState<"column" | "grid" | undefined>("column");
  const [background, setBackground] = useState<string>("");

  const removeLink = (id: string) => {
    setLink((prev) => prev.filter((item) => item.id !== id));
  };

  // CardContext
  const reorderLinkById = (activeId: string, overId: string) => {
    setLink((prev) => {
      const oldIndex = prev.findIndex((i) => i.id === activeId);
      const newIndex = prev.findIndex((i) => i.id === overId);
      if (oldIndex === -1 || newIndex === -1) return prev;
      const newArr = [...prev];
      const [moved] = newArr.splice(oldIndex, 1);
      newArr.splice(newIndex, 0, moved);
      return newArr;
    });
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
