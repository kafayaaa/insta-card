interface Props {
  buttonText: string;
  bgButtonColor: string;
  disabled?: boolean;
}

export default function AuthButton({
  buttonText,
  bgButtonColor,
  disabled,
}: Props) {
  return (
    <button
      type="submit"
      className={`w-fit px-5 md:px-10 py-2 md:py-3 text-sm md:text-base ${bgButtonColor} text-brand-white font-extrabold rounded-full hover:scale-105 transition-all duration-300 ease-out`}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
}
