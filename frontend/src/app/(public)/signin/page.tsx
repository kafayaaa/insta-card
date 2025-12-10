"use client";

import AuthForm from "@/components/layout/AuthForm";
import AuthImage from "@/components/layout/AuthImage";
import AuthButton from "@/components/ui/AuthButton";
import AuthInput from "@/components/ui/AuthInput";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (email === "mail@example.com" && password === "12345678") {
        router.push("/dashboard/links");
        alert("Login successful!");
      }
      return;
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      alert("Login failed!");
      return;
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
