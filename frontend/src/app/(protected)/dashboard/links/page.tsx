import LinkCard from "@/components/layout/LinkEditCard";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaPlus } from "react-icons/fa6";

export default function DashboardLinkPage() {
  return (
    <div className="w-full p-10 flex flex-col items-center gap-10">
      <div className="flex items-center gap-3">
        <h1 className="text-4xl font-bricolage-grotesque font-extrabold">
          My Links
        </h1>
        <div className="relative size-10 rounded-full bg-brand-light-purple/50 border border-brand-light-purple/25 inset-shadow-xs inset-shadow-brand-light-purple/50 shadow-md backdrop-blur-lg hover:scale-110 transition-all duration-200 ease-out cursor-pointer">
          <Dialog>
            <DialogTrigger>
              <FaPlus
                size={25}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-brand-dark-purple cursor-pointer"
              />
            </DialogTrigger>
            <DialogContent className="font-comfortaa">
              <DialogTitle className="text-xl font-bold mb-2">
                Add Link
              </DialogTitle>
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  className="w-full px-5 py-3 outline outline-zinc-300 rounded-full"
                  placeholder="Link Title"
                />
                <input
                  type="text"
                  className="w-full px-5 py-3 outline outline-zinc-300 rounded-full"
                  placeholder="Your Link"
                />
                <button className="w-fit px-5 py-2 mt-3 self-end rounded-full bg-brand-light-purple/50 text-brand-white border border-brand-light-purple/25 inset-shadow-2xs inset-shadow-brand-light-purple shadow-md backdrop-blur-lg hover:scale-110 transition-all duration-200 ease-out cursor-pointer">
                  Add
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="w-1/2 flex flex-col gap-5">
        <LinkCard title="Tiktok" url="https://tiktok.com" trash={true} />
        <LinkCard title="Instagram" url="https://instagram.com" trash={true} />
      </div>
    </div>
  );
}
