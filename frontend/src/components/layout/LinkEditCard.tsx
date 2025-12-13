import { LinkCardProps } from "@/types/links";
import {
  FaFacebook,
  FaInstagram,
  FaQuestion,
  FaTiktok,
  FaTrash,
} from "react-icons/fa6";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

export default function LinkEditCard({
  id,
  title,
  url,
  trash,
  onDelete,
}: LinkCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-full px-10 py-5 flex items-center gap-3 rounded-4xl bg-white/50 border border-white/50 inset-shadow-sm inset-shadow-white shadow backdrop-blur-lg"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing mr-3"
      >
        <GripVertical size={18} />
      </div>
      <div className="relative size-13">
        {title.toLowerCase() === "tiktok" ? (
          <FaTiktok
            size={30}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        ) : title.toLowerCase() === "instagram" ? (
          <FaInstagram
            size={30}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        ) : title.toLowerCase() === "facebook" ? (
          <FaFacebook
            size={30}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        ) : (
          <FaQuestion
            size={30}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        )}
      </div>
      <div className="w-full flex flex-col">
        <h2 className="text-2xl font-bricolage-grotesque font-bold">{title}</h2>
        {url && <p>{url}</p>}
      </div>
      {trash && (
        <button
          onClick={onDelete}
          className="relative size-13 rounded-full bg-rose-200/50 border border-rose-500/25 inset-shadow-xs inset-shadow-rose-200 shadow-md backdrop-blur-lg hover:scale-105 transition-all duration-200 ease-out cursor-pointer"
        >
          <FaTrash
            size={15}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  text-rose-600"
          />
        </button>
      )}
    </div>
  );
}
