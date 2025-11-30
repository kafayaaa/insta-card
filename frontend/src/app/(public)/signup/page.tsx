import AuthForm from "@/components/layout/AuthForm";
import AuthImage from "@/components/layout/AuthImage";
import AuthInput from "@/components/ui/AuthInput";

export default function SignUpPage() {
  return (
    <div className="w-full h-screen grid grid-cols-2">
      <AuthImage
        text="Join InstaCard Today!"
        textColor="text-brand-light-orange"
        bgColor="bg-brand-dark-orange"
      />
      <AuthForm
        bgColor="bg-brand-light-orange"
        bgButtonColor="bg-brand-dark-orange"
        textColor="text-brand-dark-orange"
        title="Sign Up"
        buttonText="Create Account"
        redirectText="Already have an account?"
        link="/signin"
        linkText="Sign In"
      >
        <AuthInput type="text" placeholder="username" />
        <AuthInput type="email" placeholder="email" />
        <AuthInput type="password" placeholder="password" />
      </AuthForm>
    </div>
  );
}
