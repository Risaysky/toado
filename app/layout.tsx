import { Roboto } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

const roboto = Roboto({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-gray-900`}>
        <header className="flex h-14 items-center bg-gray-800 px-4 py-2 shadow-md">
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
        </header>
        <main className="px-3 py-4 text-gray-300">{children}</main>
      </body>
    </html>
  );
}
