"use client";

import ProfileEditCard from "@/components/layout/ProfileEditCard";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useState, useEffect } from "react";
import { BiLogOutCircle } from "react-icons/bi";

export default function ProfilePage() {
  const { user, logout } = useAuth();

  // State type-safe: avatar hanya File | null
  const [formData, setFormData] = useState<{
    avatar: File | null;
    bio: string;
    theme: string;
  }>({
    avatar: null,
    bio: user?.bio || "",
    theme: user?.theme || "",
  });

  const [uploadedImg, setUploadedImg] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>(
    user?.avatar || "/profile.webp"
  );

  // Update preview image saat user pilih file
  useEffect(() => {
    if (formData.avatar) {
      const url = URL.createObjectURL(formData.avatar);
      setTimeout(() => setPreviewUrl(url));
      return () => URL.revokeObjectURL(url);
    }
  }, [formData.avatar]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, avatar: e.target.files[0] });
      setUploadedImg(true);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const fd = new FormData();

      if (formData.avatar instanceof File) {
        fd.append("avatar", formData.avatar);
      }

      fd.append("bio", formData.bio);
      fd.append("theme", formData.theme);

      const res = await fetch("http://localhost:5000/api/users/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: fd,
      });

      const data = await res.json();
      console.log("Updated user:", data);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="w-full h-full p-10 flex flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-2">
        <h1 className="font-bricolage-grotesque font-extrabold text-3xl ">
          My Profile
        </h1>
        <p>Edit your profile here</p>
      </div>
      <form
        className="relative w-full h-full max-w-2xl flex flex-col gap-15"
        onSubmit={handleUpdate}
      >
        {/* Avatar */}
        <ProfileEditCard title="Photo Profile">
          <label
            htmlFor="avatar"
            className="size-23 mt-2 rounded-full bg-brand-light-purple/20"
          >
            {formData.avatar ? (
              <Image
                src={URL.createObjectURL(formData.avatar)}
                width={100}
                height={100}
                alt="profile"
                className="rounded-full"
              />
            ) : (
              <Image
                src={user?.avatar ? `/${user.avatar}` : "/profile.webp"}
                width={100}
                height={100}
                alt="profile"
                className="rounded-full"
              />
            )}
          </label>
          <input
            className="hidden"
            type="file"
            id="avatar"
            accept="image/*"
            onChange={handleFile}
          />
        </ProfileEditCard>

        {/* Username (read-only) */}
        <ProfileEditCard title="Username">
          <div className="text-center">{user?.username}</div>
        </ProfileEditCard>

        {/* Bio */}
        <ProfileEditCard title="Bio">
          <input
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </ProfileEditCard>

        {/* Theme */}
        {/* <ProfileEditCard title="Theme">
          <input
            type="text"
            name="theme"
            value={formData.theme}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </ProfileEditCard> */}

        {/* Logout button */}
        <div className="absolute bottom-0 right-0">
          <button
            type="button"
            onClick={logout}
            className="px-5 py-2 flex items-center gap-3 text-white font-bold rounded-full bg-rose-500/50 border border-rose-500/25 inset-shadow-xs inset-shadow-rose-200 shadow-md backdrop-blur-lg hover:scale-105 transition-all duration-200 ease-out cursor-pointer"
          >
            <BiLogOutCircle size={25} />
            Logout
          </button>
        </div>

        {/* Submit button */}
        <div className="mt-10 flex justify-center">
          <button
            type="submit"
            className="px-5 py-2 rounded-full bg-brand-dark-purple text-white font-bold hover:bg-brand-purple transition-all duration-200"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
