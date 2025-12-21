"use client";

import ProfileEditCard from "@/components/layout/ProfileEditCard";
import { useAuth } from "@/context/AuthContext";
import { UserType } from "@/types/user";
import Image from "next/image";
import { useState, useEffect } from "react";
import { BiLogOutCircle } from "react-icons/bi";

type FormData = {
  username: string;
  avatar: string | null;
  bio: string;
  theme: string;
};

export default function ProfilePage() {
  const { user, setUser, token, logout } = useAuth();
  const [formData, setFormData] = useState<FormData | null>({
    username: user?.username ?? "",
    avatar: user?.avatar ?? null,
    bio: user?.bio ?? "",
    theme: user?.theme ?? "",
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        avatar: user.avatar,
        bio: user.bio,
        theme: user.theme,
      });
    }
  }, [user]);

  if (!user) {
    return (
      <div className="w-full flex items-center justify-center">
        You are not logged in
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="w-full flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("File must be an image");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB");
      return;
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleInputChange = <T extends keyof FormData>(
    field: T,
    value: FormData[T]
  ) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const updateUser = async () => {
    if (!formData) return;

    try {
      setSaving(true);
      if (!user) throw new Error("Unauthorized");

      const body = new FormData();

      body.append("username", formData.username);
      body.append("bio", formData.bio);
      body.append("theme", formData.theme);

      if (avatarFile) {
        body.append("avatar", avatarFile);
      }

      const response = await fetch(`http://localhost:5000/api/users/profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: body,
      });
      console.log(response);

      const updatedUser = await response.json();

      if (!response.ok) {
        alert(updatedUser.error || "Update failed");
        return;
      }

      // 🔥 INI YANG ANDA LUPA
      setUser(updatedUser);

      setIsEditing(false);
      setSaving(false);
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async () => {
    if (isEditing) {
      await updateUser();
    } else {
      setIsEditing(true);
    }
  };

  const mapUserToEditable = (user: UserType): FormData => ({
    username: user.username,
    avatar: user.avatar,
    bio: user.bio,
    theme: user.theme,
  });

  return (
    <div className="w-full h-full p-10 flex flex-col items-center gap-5 md:gap-10">
      <div className="flex flex-col items-center gap-2">
        <h1 className="font-bricolage-grotesque font-extrabold text-xl md:text-3xl">
          My Profile
        </h1>
        <p className="text-sm md:text-base">Edit your profile here</p>
      </div>
      <form className="relative w-full h-full max-w-2xl pb-20 md:pb-0 flex flex-col gap-5 md:gap-15">
        {/* Avatar */}
        <ProfileEditCard title="Photo Profile">
          <label
            htmlFor="avatar"
            className="size-18 md:size-23 mt-2 rounded-full bg-brand-light-purple/20"
          >
            {avatarPreview ? (
              <img
                src={avatarPreview}
                width={100}
                height={100}
                alt="preview"
                className="rounded-full object-cover"
              />
            ) : user?.avatar ? (
              // AVATAR DARI BACKEND
              <img
                src={`http://localhost:5000/avatars/${user.avatar}`}
                width={100}
                height={100}
                alt="profile"
                className="rounded-full object-cover"
              />
            ) : (
              // DEFAULT
              <img
                src="/profile.webp"
                width={100}
                height={100}
                alt="profile"
                className="rounded-full"
              />
            )}
          </label>
          {isEditing && (
            <input
              className="hidden"
              type="file"
              id="avatar"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          )}
        </ProfileEditCard>

        {/* Username (read-only) */}
        <ProfileEditCard title="Username">
          {isEditing ? (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
            />
          ) : (
            <div className="text-center">{user?.username}</div>
          )}
        </ProfileEditCard>

        {/* Bio */}
        <ProfileEditCard title="Bio">
          {isEditing ? (
            <textarea
              name="bio"
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
            />
          ) : (
            <div className="text-center">{user?.bio}</div>
          )}
        </ProfileEditCard>

        {/* Submit button / Edit Button */}
        <div className="mt-5 md:mt-10 flex justify-center gap-3">
          <button
            type="button"
            disabled={saving}
            onClick={handleEdit}
            className="px-5 py-2 text-sm md:text-base rounded-full bg-brand-dark-purple text-white font-bold hover:bg-brand-purple transition-all duration-200"
          >
            {saving ? "Saving..." : isEditing ? "Save" : "Edit Profile"}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setFormData(mapUserToEditable(user));
                setIsEditing(false);
                setAvatarPreview(null);
                setAvatarFile(null);
              }}
              className="px-5 py-2 text-sm md:text-base rounded-full bg-rose-300 text-white font-bold hover:bg-brand-purple transition-all duration-200"
            >
              Cancel
            </button>
          )}
        </div>

        {/* Logout button */}
        <div className="absolute bottom-0 right-0">
          <button
            type="button"
            onClick={logout}
            className="px-5 py-2 text-sm md:text-base flex items-center gap-3 text-white font-bold rounded-full bg-rose-500/50 border border-rose-500/25 inset-shadow-xs inset-shadow-rose-200 shadow-md backdrop-blur-lg hover:scale-105 transition-all duration-200 ease-out cursor-pointer"
          >
            <BiLogOutCircle size={25} />
            Logout
          </button>
        </div>
      </form>
    </div>
  );
}
