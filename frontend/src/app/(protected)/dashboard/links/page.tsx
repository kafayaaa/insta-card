"use client";

import LinkCard from "@/components/layout/LinkEditCard";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCard } from "@/context/CardContext";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Link } from "@/types/instacard";
import axios from "axios";

export default function DashboardLinkPage() {
  const { link, setLink, removeLink, reorderLinkById } = useCard();

  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const [open, setOpen] = useState(false);

  const getLinks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/links", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLink(res.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log("Backend says:", error.response?.data);
        alert(error.response?.data?.message || "Failed.");
        return;
      }
      alert("Unexpected error.");
    }
  };

  useEffect(() => {
    getLinks();
  }, []);

  const handleAddLink = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      console.log("TOKEN:", token);

      const normalizedUrl = newUrl.startsWith("http")
        ? newUrl
        : `https://${newUrl}`;

      const payload = {
        title: newTitle,
        url: normalizedUrl,
        icon: newTitle.toLowerCase(),
      };

      console.log("Sending payload:", payload);

      const res = await axios.post("http://localhost:5000/api/links", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLink([...link, res.data]);
      console.log(res.data);
      alert("Link added successfully!");

      // Refresh data dari database
      await getLinks(); // <--- WAJIB

      setNewTitle("");
      setNewUrl("");
      setOpen(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log("Backend says:", error.response?.data);
        alert(error.response?.data?.message || "Failed.");
        return;
      }
      alert("Unexpected error.");
    }
  };

  const handleDeleteLink = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(`http://localhost:5000/api/links/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Hapus dari state lokal
      setLink(link.filter((item) => item.id !== id));

      alert("Link deleted successfully!");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log("Backend says:", error.response?.data);
        alert(error.response?.data?.message || "Failed to delete link.");
        return;
      }
      alert("Unexpected error.");
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const token = localStorage.getItem("token");
    if (!event.over) return;

    reorderLinkById(String(event.active.id), String(event.over.id));

    const payload = {
      links: link.map((l, index) => ({ id: l.id, order: index + 1 })),
    };

    try {
      await axios.put("http://localhost:5000/api/links/reorder", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Reorder saved to backend.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // error.response bisa undefined
        console.error("Reorder error response:", error.response?.data);
        alert(error.response?.data?.error || "Failed to save new order.");
      } else {
        console.error("Unexpected error:", error);
        alert("Unexpected error while saving order.");
      }
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="w-full p-10 flex flex-col items-center gap-10">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bricolage-grotesque font-extrabold">
            My Links
          </h1>

          <div className="relative size-10 rounded-full bg-brand-light-purple/50 border border-brand-light-purple/25 inset-shadow-xs inset-shadow-brand-light-purple/50 shadow-md backdrop-blur-lg hover:scale-110 transition-all duration-200 ease-out cursor-pointer">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger>
                <FaPlus
                  size={25}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-brand-dark-purple cursor-pointer"
                />
              </DialogTrigger>
              {open && (
                <DialogContent className="font-comfortaa">
                  <DialogTitle className="text-xl font-bold mb-2">
                    Add Link
                  </DialogTitle>

                  <form
                    onSubmit={handleAddLink}
                    className="flex flex-col gap-3"
                  >
                    <input
                      type="text"
                      className="w-full px-5 py-3 outline outline-zinc-300 rounded-full"
                      placeholder="Link Title"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      required
                    />

                    <input
                      type="text"
                      className="w-full px-5 py-3 outline outline-zinc-300 rounded-full"
                      placeholder="Your Link"
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                      required
                    />

                    <button className="w-fit px-5 py-2 mt-3 self-end rounded-full bg-brand-light-purple/50 text-brand-white border border-brand-light-purple/25 inset-shadow-2xs inset-shadow-brand-light-purple shadow-md backdrop-blur-lg hover:scale-110 transition-all duration-200 ease-out cursor-pointer">
                      Add
                    </button>
                  </form>
                </DialogContent>
              )}
            </Dialog>
          </div>
        </div>
        <SortableContext
          items={link.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="w-1/2 flex flex-col gap-5">
            {link.map((item) => (
              <LinkCard
                key={item.id} // gunakan id sebagai key
                id={item.id}
                title={item.title}
                url={item.url}
                order={item.order}
                trash={true}
                onDelete={() => handleDeleteLink(item.id)} // hapus berdasarkan id, bukan index
              />
            ))}
          </div>
        </SortableContext>
      </div>
    </DndContext>
  );
}
