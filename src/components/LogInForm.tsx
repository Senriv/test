"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import { useLoginMutation } from "../redux/auth/authApiSlice";
import { setCredentials } from "@/redux/auth/authSlice";

import DynamicInput from "./form-components/DynamicInput";

export default function UserForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Email address is required"),
    password: Yup.string().required("Password required"),
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (
    values: typeof initialValues,
    {
      setFieldError,
    }: { setFieldError: (field: string, message: string) => void }
  ) => {
    const formateData = {
      email: values.email.trim(),
      password: values.password.trim(),
    };

    try {
      const userData = await login(formateData).unwrap();

      if (
        userData.response === "User must be verified." &&
        userData.userResponse.verified === false
      ) {
        localStorage.setItem(
          "temp_user",
          JSON.stringify(userData.userResponse)
        );
        return router.push("/auth/email-verification");
      }

      dispatch(setCredentials(userData));
      router.push("/home");
    } catch (error: unknown) {
      console.error("Error while logging in:", error);

      // Устанавливаем ошибку для полей
      setFieldError("email", " ");
      setFieldError(
        "password",
        "Invalid email or password. Please check your credentials."
      );
    }
  };

  return (
    <div className="flex justify-center mt-[80px]">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
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
          <Form>
            {/* Email field */}
            <div className="relative">
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

            {/* Password field */}
            <div className="relative mt-6">
              <DynamicInput
                id="password"
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {/* Toggle Password Visibility */}
              <div
                className="absolute top-4 right-4 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                <Image
                  src={
                    showPassword
                      ? "/images/svgs/input-entrence-svg/password-eye/Show.svg"
                      : "/images/svgs/input-entrence-svg/password-eye/Hide2.svg"
                  }
                  alt="toggle password visibility"
                  width={24}
                  height={24}
                />
              </div>
            </div>

            {/* Forgot Password Link */}
            <p className="mt-4 mb-6 flex">
              <Link
                href="#"
                className="text-[#4321AD] text-[13px] leading-[1.38] p-4"
              >
                Forgot Password?
              </Link>
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isValid || !dirty}
              className={`w-[361px] px-6 py-3 rounded-[24px] ${
                !isValid || !dirty
                  ? "bg-[#EAEAEB] text-[#8E8F94] cursor-not-allowed"
                  : "bg-[#1A8935] text-white"
              } text-[17px] font-semibold`}
            >
              Log In
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
