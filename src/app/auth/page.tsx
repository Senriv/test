"use client";

import Image from "next/image";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <section className="  w-[393px] flex flex-col justify-center items-center h-screen">
      <Image
        className="mb-10"
        src="images/svgs/favicon/Logo.svg"
        alt="logo"
        width={170}
        height={100}
      />
      <h1 className="text-base-black text-[28px] font-bold leading-[1.214] text-center mb-4">
        Welcome to Job Swap
      </h1>
      <p className="text-base-black text-[17px] leading-[1.294] max-w-[313px] text-center mb-[111px]">
        Find a better way to work: closer, faster, or more enjoyable.
      </p>
      <ul className="flex flex-col gap-4">
        <li>
          <Link
            href="auth/create-account"
            className="flex justify-center w-[313px] h-12 py-3 px-6 bg-[#1A8935] rounded-3xl text-base-white font-medium"
          >
            Create an account
          </Link>
        </li>
        <li>
          <Link
            href="auth/login"
            className="flex justify-center w-[313px] h-12 py-3 px-6 bg-[#F4F4F5] rounded-3xl text-base-black font-medium"
          >
            Log in
          </Link>
        </li>
      </ul>
    </section>
  );
}
