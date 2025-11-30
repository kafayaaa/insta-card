import Sidebar from "@/components/layout/Sidebar";
import WorkSpace from "@/components/layout/WorkSpace";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen flex bg-zinc-100 text-brand-black">
      <Sidebar />
      <WorkSpace>{children}</WorkSpace>
    </div>
  );
}
