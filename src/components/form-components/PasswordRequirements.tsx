import { useState, useEffect } from "react";

interface PasswordRequirementsProps {
  hasError: boolean;
  toShow: boolean;
  isTouched: boolean;
}

export default function PasswordRequirements({
  hasError,
  toShow,
  isTouched,
}: PasswordRequirementsProps) {
  const [backgroundColor, setBackgroundColor] = useState<string>("#F4F4F5");

  useEffect(() => {
    if (toShow) {
      if (!isTouched) {
        setBackgroundColor("#F4F4F5");
      } else {
        setBackgroundColor(hasError ? "#FEE2E2" : "#E6FAEE");
      }
    }
  }, [toShow, isTouched, hasError]);

  if (!toShow) return null;

  return (
    <div
      className={`p-4 w-[361px] h-[158px] flex flex-col justify-between text-[13px] text-[#353841] leading-[1.38] rounded-[16px] mt-2 mb-9`}
      style={{ backgroundColor }}
    >
      <h2>Password Requirements:</h2>
      <ul className="list-disc ml-4">
        <li>
          <p>
            Min <span className="font-bold">8 characters</span> long
          </p>
        </li>
        <li>
          <p>
            <span className="font-bold">1</span> lower-case letter (a-z)
          </p>
        </li>
        <li>
          <p>
            <span className="font-bold">1</span> upper-case letter (A-Z)
          </p>
        </li>
        <li>
          <p>
            <span className="font-bold">1</span> number (0-9)
          </p>
        </li>
        <li>
          <p>
            <span className="font-bold">1</span> special character (!@#$%^&*)
          </p>
        </li>
      </ul>
    </div>
  );
}
