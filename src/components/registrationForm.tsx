"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Modal from "./Modal";

import { useRegisterMutation } from "@/redux/auth/authApiSlice";

import DynamicInput from "./form-components/DynamicInput";
import PasswordRequirements from "./form-components/PasswordRequirements";

export default function RegistrationForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);
  const [receiveJobUpdates, setReceiveJobUpdates] = useState<boolean>(false);
  const [termsAndPolicyAccepted, setTermsAndPolicyAccepted] =
    useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [register, { isLoading, error: isError }] = useRegisterMutation();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleReceiveJobUpdates = () => {
    setReceiveJobUpdates((prev) => !prev);
  };

  const toggleTermsAndPolicyAccepted = () => {
    setTermsAndPolicyAccepted((prev) => !prev);
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("First name is required")
      .matches(
        /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/,
        "Use only letters without numbers or special characters"
      ),
    lastName: Yup.string()
      .required("Last name is required")
      .matches(
        /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/,
        "Use only letters without numbers or special characters"
      ),
    email: Yup.string()
      .email("Enter a valid email address")
      .required("Email address is required"),
    password: Yup.string()
      .required("Password required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
        "Make sure the password meets the necessary criteria"
      ),
  });

  const onSubmit = async (values: typeof initialValues) => {
    try {
      const formateData = {
        ...values,
        receiveUpdates: receiveJobUpdates,
      };

      const userData = await register(formateData).unwrap();

      localStorage.setItem("temp_user", JSON.stringify(userData));

      router.push("/auth/email-verification");
    } catch (error: unknown) {
      console.error("Ошибка:", error);

      if (
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        "originalStatus" in error
      ) {
        const typedError = error as { data: string; originalStatus: number };

        if (
          typedError.data === "User with this email already exists." &&
          typedError.originalStatus === 404
        ) {
          setIsModalOpen(true);
        }
      } else {
        console.error("Unexpected error format:", error);
      }
    }
  };

  return (
    <div className="flex justify-center mt-[48px]">
      <div className="w-full">
        <h2 className="text-base-black text-[20px] font-medium leading-[1.25] mb-4">
          Welcome to Job Swap
        </h2>
        <p className="w-[361px] text-base-black text-[17px] leading-[1.29] ">
          Create an account to discover job opportunities nearby or explore tips
          for a better commute.
        </p>
        <p className="mt-4 text-[#030712] text-[14px] leading-[1.14] w-[361px]">
          All fields are required. Please fill out every field before continue
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, handleChange, handleBlur, errors, touched }) => (
            <Form className="pt-9">
              {/* DynamicInput: First Name */}
              <div className="relative">
                {touched.firstName && !errors.firstName && (
                  <Image
                    src="/images/svgs/input-entrence-svg/checkmark.svg"
                    alt="tick"
                    width={24}
                    height={24}
                    className="absolute top-4 right-4 z-10"
                  />
                )}
                <DynamicInput
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              {/* DynamicInput: Last Name */}
              <div className="relative">
                {touched.lastName && !errors.lastName && (
                  <Image
                    src="/images/svgs/input-entrence-svg/checkmark.svg"
                    alt="tick"
                    width={24}
                    height={24}
                    className="absolute top-4 right-4 z-10"
                  />
                )}
                <DynamicInput
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              {/* DynamicInput: Email */}
              <div className="relative">
                {touched.email && !errors.email && (
                  <Image
                    src="/images/svgs/input-entrence-svg/checkmark.svg"
                    alt="tick"
                    width={24}
                    height={24}
                    className="absolute top-4 right-4 z-10"
                  />
                )}
                <DynamicInput
                  id="email"
                  name="email"
                  label="Email Address"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              {/* DynamicInput: Password */}
              <div className="relative">
                {touched.password && !errors.password && (
                  <Image
                    src="/images/svgs/input-entrence-svg/checkmark.svg"
                    alt="tick"
                    width={24}
                    height={24}
                    className="absolute top-4 right-12 z-10"
                  />
                )}
                <DynamicInput
                  id="password"
                  name="password"
                  label="Password "
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onBlur={(e) => {
                    handleBlur(e);
                    setIsPasswordFocused(false); // set false when we lost focus
                  }}
                  onFocus={() => setIsPasswordFocused(true)} //set true on focus
                />
                {/* Toggle Password Visibility Icon */}
                <div
                  className="absolute top-4 right-4 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  <Image
                    src={
                      showPassword
                        ? "/images/svgs/input-entrence-svg/password-eye/Show.svg" // Icon for showing password
                        : "/images/svgs/input-entrence-svg/password-eye/Hide2.svg" // Icon for hiding password
                    }
                    alt="toggle password visibility"
                    width={24}
                    height={24}
                  />
                </div>
              </div>

              <PasswordRequirements
                hasError={!!(touched.password && errors.password)}
                toShow={isPasswordFocused}
                isTouched={!!touched.password} //!! it means boolean(true or false)
              />

              <ul className="flex flex-col w-[361px] gap-6 text-[12px] mt-9">
                <li className="flex gap-4">
                  <button onClick={toggleReceiveJobUpdates} type="button">
                    <Image
                      src={
                        receiveJobUpdates
                          ? "/images/svgs/checkbox/checkmark.square.svg"
                          : "/images/svgs/checkbox/square.svg"
                      }
                      alt="checkbox"
                      width={16}
                      height={16}
                    />
                  </button>
                  <p>Yes, I agree to receive updates from Job Swap</p>
                </li>
                <li className="flex gap-4">
                  <button onClick={toggleTermsAndPolicyAccepted} type="button">
                    <Image
                      src={
                        termsAndPolicyAccepted
                          ? "/images/svgs/checkbox/checkmark.square.svg"
                          : "/images/svgs/checkbox/square.alert.svg"
                      }
                      alt="checkbox"
                      width={16}
                      height={16}
                    />
                  </button>

                  <p>
                    I agree to Job Swap’s the{" "}
                    <span className="text-[#0037EB] underline">
                      Terms & Conditions
                    </span>{" "}
                    and 
                    <span className="text-[#0037EB] underline">
                      Privacy Policy
                    </span>
                    .
                  </p>
                </li>
              </ul>
              {!termsAndPolicyAccepted && (
                <p className="text-[#F2415A] text-[12px] mt-1 ml-8">
                  Please check the box to continue
                </p>
              )}

              <button
                type="submit"
                className={`flex justify-center mt-9 h-12 py-3 px-6 rounded-3xl text-base-white font-medium w-full ${
                  !termsAndPolicyAccepted
                    ? "bg-[#EAEAEB] cursor-not-allowed text-[#8E8F94]"
                    : "bg-[#1A8935] hover:bg-green-700"
                }`}
                disabled={!termsAndPolicyAccepted}
              >
                Continue
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div>
          <h2 className="w-[264px] text-[18px] leading-[1.22] font-semibold mb-2">
            Do you already have an account?
          </h2>
          <p className="text-[14px] leading-[1.43] mb-6 w-[297px]">
            This email is already registered. Please Log In or try with another
            email.
          </p>
          <div className="flex flex-col items-center gap-4 w-[297px]">
            <Link
              href="/sign-in"
              className="text-[16px] leading-[1.37] font-semibold text-base-white px-6 py-3 bg-[#1A8935] rounded-[24px] w-full text-center"
            >
              Go to Log in
            </Link>
            <button
              type="button"
              className="text-[16px] leading-[1.37] font-semibold text-base-black px-6 py-3 bg-[#F4F4F5] rounded-[24px] w-full"
              onClick={() => setIsModalOpen(false)}
            >
              Try Again
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
