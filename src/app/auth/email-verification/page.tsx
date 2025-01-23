"use client";

import Image from "next/image";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import {
  useResendVerifyCodeMutation,
  useVerifyCodeMutation,
} from "@/redux/auth/authApiSlice";
import { setCredentials } from "@/redux/auth/authSlice";
import DynamicInput from "@/components/form-components/DynamicInput";

interface User {
  email: string;
  id: number;
  name: string;
  verified: boolean;
}

export default function EmailVerificationPage() {
  const [localStorageObj, setLocalStorageObj] = useState<User | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const [resendVerifyCode] = useResendVerifyCodeMutation();
  const [verifyAccount] = useVerifyCodeMutation();

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const person = localStorage.getItem("temp_user");

      if (person) {
        try {
          const parsedResult: User = JSON.parse(person);
          setLocalStorageObj(parsedResult);
        } catch (error) {
          console.error("Error when parsing data from localStorage:", error);
          router.replace("/");
        }
      } else {
        router.replace("/");
      }
    }
  }, [router]);

  const validationSchema = Yup.object({
    verifyCode: Yup.string()
      .required("Verification code is required")
      .matches(/^\d{6}$/, "The code entered is incorrect. Try again"),
  });

  const handleResendVerifyCode = async () => {
    if (!localStorageObj?.email) return;
    try {
      await resendVerifyCode({ email: localStorageObj.email }).unwrap();
    } catch (error: unknown) {
      console.error("Error while resending the code to mail:", error);
    }
  };

  const handleVerifyAccount = async (
    values: { verifyCode: string },
    {
      setFieldError,
    }: { setFieldError: (field: string, message: string) => void }
  ) => {
    if (!localStorageObj?.email) return;

    const formateData = {
      email: localStorageObj.email,
      verificationCode: values.verifyCode,
    };

    try {
      const userData = await verifyAccount(formateData).unwrap();
      dispatch(setCredentials(userData));
      localStorage.removeItem("temp_user");
      router.push("/auth/email-verification/success");
    } catch (error: unknown) {
      console.error("Error during account verification:", error);

      if (
        typeof error === "object" &&
        error !== null &&
        "status" in error &&
        "data" in error
      ) {
        const typedError = error as {
          status: number;
          data: { response: string; userResponse: string | null };
        };

        if (
          typedError.data.response === "User verification failed." &&
          typedError.status === 404
        ) {
          setFieldError(
            "verifyCode",
            "The verification code is incorrect. Try again"
          );
        }
      } else {
        console.error("Unexpected error format:", error);
      }
    }
  };

  function obfuscateEmail(email: string): string {
    const [localPart, domainPart] = email.split("@");

    if (!localPart || !domainPart) {
      throw new Error("Invalid email format");
    }

    const obfuscatedLocalPart = `...${localPart.slice(-1)}`;

    return `${obfuscatedLocalPart}@${domainPart}`;
  }

  return (
    <section className="flex flex-col items-center">
      <div className="absolute top-0 left-0 flex w-full justify-between items-center">
        <Link href="/sign-up/email-form" className="p-[12px]">
          <Image
            src="/images/svgs/navigation/arrow_left_mobile.svg"
            alt="arrow-back"
            width={24}
            height={24}
          />
        </Link>
        <div className="flex flex-row gap-2">
          <p className="text-base-black text-[13px] font-medium leading-[1.38]">
            Already have an account?
          </p>
          <Link
            href="/sign-in"
            className="underline decoration-[#0069E0] text-[#0069E0] text-[13px] font-medium leading-[1.38] mr-[12px]"
          >
            Log In
          </Link>
        </div>
      </div>
      <div className="mt-16">
        <h1 className="text=[20px] font-bold leading-[1.25] mb-4">
          Email Verification
        </h1>
        <p className="text-[17px] leading-[1.29] w-[361px] mb-[52px]">
          Please enter the 6-digit verification code sent to your email{" "}
          {localStorageObj && obfuscateEmail(localStorageObj.email)}. The code
          is valid for 30 minutes.
        </p>
        <Formik
          initialValues={{ verifyCode: "" }} // Имя поля - "verifyCode"
          validationSchema={validationSchema}
          onSubmit={handleVerifyAccount}
        >
          {({
            values,
            handleChange,
            handleBlur,
            errors,
            touched,
            isValid,
            dirty,
          }) => (
            <Form className="flex flex-col items-center">
              {/* DynamicInput: Verification Code Field */}
              <div className="relative">
                {touched.verifyCode && !errors.verifyCode && (
                  <Image
                    src="/images/svgs/input-entrence-svg/checkmark.svg"
                    alt="tick"
                    width={24}
                    height={24}
                    className="absolute top-8 right-4 z-10"
                  />
                )}
                <DynamicInput
                  id="verifyCode"
                  name="verifyCode"
                  label="Verification Code"
                  value={values.verifyCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <ul className="flex flex-row gap-4 justify-center w-full mt-9">
                <li>
                  <button
                    type="button"
                    onClick={handleResendVerifyCode}
                    className="w-[172px] px-6 py-3 rounded-[24px] bg-[#F4F4F5] text-[17px] font-semibold"
                  >
                    Resend Code
                  </button>
                </li>
                <li>
                  <button
                    type="submit"
                    disabled={!isValid || !dirty}
                    className={`w-[172px] px-6 py-3 rounded-[24px] ${
                      !isValid || !dirty
                        ? "bg-[#EAEAEB] text-[#8E8F94] cursor-not-allowed"
                        : "bg-[#1A8935] text-base-white"
                    } text-[17px] font-semibold`}
                  >
                    Submit
                  </button>
                </li>
              </ul>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
