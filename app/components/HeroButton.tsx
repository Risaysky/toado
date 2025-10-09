import Link from "next/link";

type buttonProps = { path: string; children: React.ReactNode };

export default function HeroButton({ path, children }: buttonProps) {
  return (
    <Link
      href={path}
      className="min-w-40 rounded-md bg-gray-700 py-3 text-center text-lg text-gray-300 transition-all hover:cursor-pointer active:bg-gray-700/50 active:text-gray-300/50"
    >
      {children}
    </Link>
  );
}
