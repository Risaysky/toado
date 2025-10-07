import Image from "next/image";
import { HeroButton } from "./components/HeroButton";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="pt-27 pb-10">
        <Image
          className="mx-auto h-[52px] w-[52px]"
          src="/toado.svg"
          alt="toado"
          width="52"
          height="52"
        />
        <p className="py-0.5 text-center text-7xl font-bold text-gray-300">
          TOADO
        </p>
        <p className="text-center text-2xl text-gray-400">
          Todo-lists done right
        </p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <Link href="/login">
          <HeroButton>Login</HeroButton>
        </Link>
        <Link href="signup">
          <HeroButton>Signup</HeroButton>
        </Link>
      </div>
    </>
  );
}
