"use client";

import AuthForm from "@/components/layout/AuthForm";
import AuthImage from "@/components/layout/AuthImage";
import AuthButton from "@/components/ui/AuthButton";
import AuthInput from "@/components/ui/AuthInput";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Sign up successful!");
    router.push("/signin");
  };
  return (
    <div className="w-full h-screen grid grid-cols-2">
      <AuthImage
        text="Join InstaCard Today!"
        textColor="text-brand-light-orange"
        bgColor="bg-brand-dark-orange"
      />
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
        <AuthInput type="text" placeholder="username" />
        <AuthInput type="email" placeholder="email" />
        <AuthInput type="password" placeholder="password" />
        <AuthButton buttonText="Sign Up" bgButtonColor="bg-brand-dark-orange" />
      </AuthForm>
    </div>
  );
}
