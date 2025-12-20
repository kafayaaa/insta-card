"use client";

import AuthForm from "@/components/layout/AuthForm";
import AuthImage from "@/components/layout/AuthImage";
import AuthButton from "@/components/ui/AuthButton";
import AuthInput from "@/components/ui/AuthInput";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiHome5Fill } from "react-icons/ri";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login, setUser } = useAuth();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      if (res.status === 401) {
        alert("Email or password is incorrect!");
        return;
      } else if (res.status !== 200) {
        alert("Login failed!");
        return;
      }

      // Pastikan API mengembalikan token dan user
      const { token, user } = res.data;

      // Simpan token ke context
      login(token, user);

      // Simpan user optional jika API mengembalikan data user
      if (user) setUser(user);

      alert("Login successful!");
      router.push("/dashboard/links");
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      alert("Login failed!");
    }
  };

  return (
    <div className="relative w-full h-screen grid grid-cols-1 md:grid-cols-2">
      <Link
        href="/"
        className="absolute top-10 left-10 p-3 text-xl text-brand-dark-purple bg-zinc-50/35 border border-white/50 rounded-full inset-shadow-xs inset-shadow-white shadow backdrop-blur-lg cursor-pointer hover:scale-105 transition-all duration-300 ease-out"
      >
        <RiHome5Fill />
      </Link>
      <AuthForm
        onSubmit={handleSignIn}
        bgColor="bg-brand-light-purple"
        bgButtonColor="bg-brand-dark-purple"
        textColor="text-brand-dark-purple"
        title="Sign In"
        redirectText="Don't have an account?"
        link="/signup"
        linkText="Sign Up"
      >
        <AuthInput
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <AuthInput
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <AuthButton buttonText="Sign In" bgButtonColor="bg-brand-dark-purple" />
      </AuthForm>
      <div className="hidden md:block">
        <AuthImage
          text="Join InstaCard Today!"
          textColor="text-brand-light-purple"
          bgColor="bg-brand-dark-purple"
        />
      </div>
    </div>
  );
}
