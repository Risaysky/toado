import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default async function Header() {
  return (
    <header className="flex h-14 items-center justify-between bg-gray-800 px-4 py-2 shadow-md">
      <Link className="flex items-center gap-2" href="/">
        <Image
          className="h-[22px] w-[22px]"
          src="/toado.svg"
          alt="toado"
          width="22"
          height="22"
        />
        <span className="text-md font-semibold text-gray-200">TOADO</span>
      </Link>
      <LogoutButton />
    </header>
  );
}
