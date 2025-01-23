import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
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
        Landing page Job Swap
      </h1>

      <Link
        href="/auth"
        className="flex justify-center w-[313px] h-12 py-3 px-6 bg-[#1A8935] rounded-3xl text-base-white font-medium"
      >
        Join us
      </Link>
    </section>
  );
}
