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
      className={`w-fit px-10 py-3 ${bgButtonColor} text-brand-white font-extrabold rounded-full hover:scale-105 transition-all duration-300 ease-out`}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
}
