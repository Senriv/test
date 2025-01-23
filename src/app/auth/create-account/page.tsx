import Link from "next/link";
import Image from "next/image";

import Button from "@/components/re-usebleButton";

export default function СreateAccountPage() {
  return (
    <section className="w-[393px] h-screen  flex flex-col justify-center items-center ">
      <h1 className="text-base-black text-[28px] font-bold leading-[1.21] mb-4 text-center">
        Create an account
      </h1>
      <p className="text-base-black text-[17px] leading-[1.29] text-center mb-9">
        Optimize your commute
      </p>
      <ul className=" w-[313px] flex flex-col gap-4 mb-[37px] ">
        <li className="flex justify-center gap-2 h-12 py-3 px-6 rounded-3xl border border-[#D4D5D7] font-medium hover:bg-[#F4F4F5] hover:border-transparent cursor-pointer">
          <Image
            src="/images/svgs/social-icons/apple.logo.svg"
            alt="apple logo corp"
            width={24}
            height={24}
          />
          <Button text={"Continue with Apple"} />
        </li>
        <li className="flex justify-center gap-2 h-12 py-3 px-6 rounded-3xl border border-[#D4D5D7] font-medium hover:bg-[#F4F4F5] hover:border-transparent cursor-pointer">
          <Image
            src="/images/svgs/social-icons/google.svg"
            alt="apple logo corp"
            width={24}
            height={24}
          />
          <Button text={"Continue with Google"} />
        </li>
        <li className="flex justify-center h-12 py-3 px-6 rounded-3xl border border-[#D4D5D7] font-medium hover:bg-[#F4F4F5] hover:border-transparent cursor-pointer">
          <Link href="/auth/email-registration" className="flex gap-2 ">
            <Image
              src="/images/svgs/social-icons/envelope.svg"
              alt="apple logo corp"
              width={24}
              height={24}
            />
            Continue with Email
          </Link>
        </li>
      </ul>
      <div className="flex flex-row gap-2">
        <p className="text-base-black text-[13px] font-medium leading-[1.38]">
          Already have an account?
        </p>
        <Link
          href="/auth/login"
          className="underline decoration-[#0069E0] text-[#0069E0]  text-[13px] font-medium leading-[1.38]"
        >
          Log In
        </Link>
      </div>
    </section>
  );
}
