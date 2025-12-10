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
import { LinkCardProps } from "@/types/links";
import { useState } from "react";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function DashboardLinkPage() {
  const { link, setLink, removeLink, reorderLinkById } = useCard();

  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const [open, setOpen] = useState(false);

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();

    const newLink: LinkCardProps = {
      id: crypto.randomUUID(),
      title: newTitle,
      url: newUrl,
      order: link.length,
    };

    setLink([...link, newLink]);

    setNewTitle("");
    setNewUrl("");

    setOpen(false);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (!event.over) return;
    reorderLinkById(String(event.active.id), String(event.over.id));
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
                onDelete={() => removeLink(item.id)} // hapus berdasarkan id, bukan index
              />
            ))}
          </div>
        </SortableContext>
      </div>
    </DndContext>
  );
}
