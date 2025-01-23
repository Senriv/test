"use client";

type Props = {
  text?: string;
};

export default function InputErrorMessage({ text }: Props) {
  if (!text) return null;
  return (
    <p className="mt-2 text-[#F2415A] text-[11px] font-bold leading-[1.18]">
      {text}
    </p>
  );
}
