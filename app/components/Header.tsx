"use client";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "../lib/supabase/client";
import { Session } from "@supabase/supabase-js";

export default function Header() {
  const [session, setSession] = useState<Session | null>(null);
  const path = usePathname();

  useEffect(() => {
    async function checkSession() {
      const supabase = createClient();
      const {
        data: { session: sessionData },
      } = await supabase.auth.getSession();
      setSession(sessionData);
    }

    checkSession();
  }, [path]);

  return (
    <header className="flex h-14 items-center justify-between bg-gray-800 px-4 py-2 shadow-md">
      <Link className="flex items-center gap-2" href={session ? "/todos" : "/"}>
        <Image
          className="h-[22px] w-[22px]"
          src="/toado.svg"
          alt="toado"
          width="22"
          height="22"
        />
        <span className="text-md font-semibold text-gray-200">TOADO</span>
      </Link>
      {session && <LogoutButton />}
    </header>
  );
}
