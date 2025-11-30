import AuthForm from "@/components/layout/AuthForm";
import AuthImage from "@/components/layout/AuthImage";
import AuthInput from "@/components/ui/AuthInput";

export default function SignInPage() {
  return (
    <div className="w-full h-screen grid grid-cols-2">
      <AuthImage
        text="Join InstaCard Today!"
        textColor="text-brand-light-purple"
        bgColor="bg-brand-dark-purple"
      />
      <AuthForm
        bgColor="bg-brand-light-purple"
        bgButtonColor="bg-brand-dark-purple"
        textColor="text-brand-dark-purple"
        title="Sign In"
        buttonText="Sign In"
        redirectText="Don't have an account?"
        link="/signup"
        linkText="Sign Up"
      >
        <AuthInput type="email" placeholder="email" />
        <AuthInput type="password" placeholder="password" />
      </AuthForm>
    </div>
  );
}
