"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import AuthForm from "@/components/layout/AuthForm";
import AuthImage from "@/components/layout/AuthImage";
import AuthInput from "@/components/ui/AuthInput";
import AuthButton from "@/components/ui/AuthButton";
import { RiHome5Fill } from "react-icons/ri";
import Link from "next/link";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/users/register", {
        username,
        email,
        password,
      });

      if (res.status === 200 || res.status === 201) {
        alert("Sign up successful!");
        router.push("/signin"); // redirect ke login
      } else {
        alert("Sign up failed!");
      }
    } catch (error) {
      console.error("SIGNUP ERROR:", error);
      const msg = error instanceof Error ? error.message : "Sign up failed!";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2">
      <Link
        href="/"
        className="absolute top-5 md:top-10 left-5 md:left-10 p-3 text-xl text-brand-dark-orange bg-zinc-50/35 border border-white/50 rounded-full inset-shadow-xs inset-shadow-white shadow backdrop-blur-lg cursor-pointer hover:scale-105 transition-all duration-300 ease-out"
      >
        <RiHome5Fill />
      </Link>
      <AuthForm
        onSubmit={handleSignUp}
        bgColor="bg-brand-light-orange"
        bgButtonColor="bg-brand-dark-orange"
        textColor="text-brand-dark-orange"
        title="Sign Up"
        redirectText="Already have an account?"
        link="/signin"
        linkText="Sign In"
      >
        <AuthInput
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <AuthButton
          buttonText={loading ? "Signing up..." : "Sign Up"}
          bgButtonColor="bg-brand-dark-orange"
          disabled={loading}
        />
      </AuthForm>
      <div className="hidden md:block">
        <AuthImage
          text="Join InstaCard Today!"
          textColor="text-brand-light-orange"
          bgColor="bg-brand-dark-orange"
        />
      </div>
    </div>
  );
}
