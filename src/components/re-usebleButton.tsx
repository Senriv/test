import ButtonProps from "@/types/ButtonProps";

export default function Button({ text, className, DoFunction }: ButtonProps) {
  return (
    <button type="button" className={className} onClick={DoFunction}>
      {text}
    </button>
  );
}
