import Link from "next/link";
import Image from "next/image";
import LogInForm from "@/components/LogInForm";

export default function LoginPage() {
  return (
    <section className=" flex flex-col jitems-center  ">
      <Link
        href="/"
        className="absolute top-0 left-0 flex w-full  items-center  gap-2 p-[12px]"
      >
        <Image
          src="/images/svgs/navigation/arrow_left_mobile.svg"
          alt="arrow-back"
          width={24}
          height={24}
        />
        Back
      </Link>
      <h3 className="absolute top-3 left-[45%] ">Log in</h3>
      <LogInForm />
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
