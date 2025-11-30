type AuthInputProps = {
  type: string;
  placeholder: string;
};

export default function AuthInput({ type, placeholder }: AuthInputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-6 py-3 text-xl text-brand-dark-orange focus:outline-brand-dark-orange rounded-full bg-white/50 border-white inset-shadow-xs inset-shadow-white backdrop-blur-lg"
      required
    />
  );
}
