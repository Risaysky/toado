import { Roboto } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./components/LogoutButton";
import { createClient } from "./utils/supabase/server";

const roboto = Roboto({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  return (
    <html lang="en">
      <body className={`${roboto.className} bg-gray-900`}>
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
          {user && <LogoutButton />}
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
