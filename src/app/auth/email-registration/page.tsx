import Image from "next/image";
import Link from "next/link";

import RegistrationForm from "@/components/registrationForm";

export default function EmailRegistrationPage() {
  return (
    <section className=" flex flex-col jitems-center  ">
      <div className=" fixed top-0 left-0 flex w-full justify-between items-center bg-base-white">
        <Link href="/sign-up" className="  p-[12px]">
          <Image
            src="/images/svgs/navigation/arrow_left_mobile.svg"
            alt="arrow-back"
            width={24}
            height={24}
          />
        </Link>
        <div className="flex flex-row gap-2">
          <p className="text-base-black text-[13px] font-medium leading-[1.38] ">
            Already have an account?
          </p>
          <Link
            href="/sign-in"
            className="underline decoration-[#0069E0] text-[#0069E0]  text-[13px] font-medium leading-[1.38] mr-[12px]"
          >
            Log In
          </Link>
        </div>
      </div>
      <RegistrationForm />
      <p className="flex justify-center mt-4 mb-4">or</p>
      <ul className="flex flex-row gap-4 items-center justify-center">
        <li>
          <Link
            href="/"
            className=" flex  justify-center w-14 h-14 bg-[#F4F4F5] rounded-full"
          >
            <Image
              src="/images/svgs/social-icons/google.svg"
              alt="apple logo corp"
              width={24}
              height={24}
            />
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="flex justify-center w-14 h-14 rounded-full bg-black text-white"
          >
            <Image
              src="/images/svgs/social-icons/apple.logo.white.svg"
              alt="apple icon"
              width={24}
              height={24}
            />
          </Link>
        </li>
      </ul>
    </section>
  );
}
