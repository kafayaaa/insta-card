"use client";

import AuthForm from "@/components/layout/AuthForm";
import AuthImage from "@/components/layout/AuthImage";
import AuthButton from "@/components/ui/AuthButton";
import AuthInput from "@/components/ui/AuthInput";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    <div className="w-full h-screen grid grid-cols-2">
      <AuthImage
        text="Join InstaCard Today!"
        textColor="text-brand-light-purple"
        bgColor="bg-brand-dark-purple"
      />

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
    </div>
  );
}
