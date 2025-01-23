import { InputHTMLAttributes } from "react";
import { useField } from "formik";

interface DynamicInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  type?: string;
}

const DynamicInput: React.FC<DynamicInputProps> = ({
  label,
  id,
  type = "text",
  ...props
}) => {
  const [field, meta] = useField(props);

  const hasError = meta.touched && meta.error;

  return (
    <div className="relative mt-4">
      <input
        {...field}
        id={id}
        type={type}
        className={`relative w-[361px] h-[56px] rounded-[12px] border-[2px] pt-[24px] pb-[10px] px-4 peer text-[17px] leading-[1.29] tracking-[-0.43px] placeholder-transparent focus:outline-none
          ${hasError ? "border-[#F2415A]" : "border-[#D4D5D7] "} `}
        placeholder={label}
        {...props}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 top-2 text-[#030712] text-[11px] leading-[1.18] tracking-[0.06px] transition-all peer-placeholder-shown:top-[24px] peer-focus:top-2 cursor-text`}
      >
        {label}
      </label>
      {hasError && (
        <div className="text-[12px] text-[#F2415A] mt-2 ml-4">{meta.error}</div>
      )}
    </div>
  );
};

export default DynamicInput;
