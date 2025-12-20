import { User } from "@/types/instacard";
import { notFound } from "next/navigation";
import UserPageClient from "./UserPageClient";

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  // Unwrap params
  const { username } = await params;

  // Fetch data dari backend
  const res = await fetch(`http://localhost:5000/api/users/${username}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const profile: User = await res.json();

  return <UserPageClient profile={profile} />;
}
