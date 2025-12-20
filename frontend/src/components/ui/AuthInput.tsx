type AuthInputProps = {
  type: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function AuthInput({
  type,
  placeholder,
  onChange,
}: AuthInputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-5 md:px-6 py-2 md:py-3 text-base md:text-xl text-brand-dark-orange focus:outline-brand-dark-orange rounded-full bg-white/50 border-white inset-shadow-xs inset-shadow-white backdrop-blur-lg"
      onChange={onChange}
      required
    />
  );
}
