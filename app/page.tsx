import Image from "next/image";
import Button from "./components/Button";

export default function Home() {
  return (
    <main className="px-3 text-gray-300">
      <div className="pt-27 pb-10">
        <Image
          className="mx-auto h-[52px] w-[52px]"
          src="/toado.svg"
          alt="toado"
          width="52"
          height="52"
        />
        <p className="py-0.5 text-center text-7xl font-bold">TOADO</p>
        <p className="text-center text-2xl text-gray-400">
          Todo-lists done right
        </p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <Button>Login</Button>
        <Button>Sign-up</Button>
      </div>
    </main>
  );
}
