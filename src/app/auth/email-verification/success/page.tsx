"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SuccessRegistrationPage() {
  const router = useRouter();
  return (
    <section className=" flex flex-col items-center  w-[393px] px-6 justify-center h-screen">
      <div className=" absolute top-0 left-0 flex w-full justify-between items-center ">
        <Link
          href="/sign-up/email-form/email-verification"
          className="  p-[12px]"
        >
          <Image
            src="/images/svgs/navigation/arrow_left_mobile.svg"
            alt="arrow-back"
            width={24}
            height={24}
          />
        </Link>
      </div>
      <div className="flex flex-col items-center">
        <Image
          src="/images/svgs/email-verifaed-page/Envelope_Big.svg"
          alt="envelope"
          width={80}
          height={80}
          className="mb-10"
        />
        <div className="flex flex-row gap-2 ">
          <h1 className="text-[#030712] text-[28px] font-bold mb-2">
            Email Verified
          </h1>
          <Image
            src="/images/svgs/email-verifaed-page/Checkmark.svg"
            alt="checkmark"
            width={32}
            height={32}
          />
        </div>

        <p className="w-[280px] text-center mb-[76px]">
          Your email is verified! Let’s move on to the next step together.
        </p>

        <button
          type="button"
          onClick={() => {
            router.replace("/home");
          }}
          className="flex justify-center w-[313px] px-6 py-3 rounded-[24px] bg-[#1A8935] text-[17px] font-bold text-base-white"
        >
          Continue
        </button>
      </div>
    </section>
  );
}
