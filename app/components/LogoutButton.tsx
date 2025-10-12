"use client";

import { useEffect, useState } from "react";
import { signout } from "../lib/actions";
import { createClient } from "../lib/supabase/client";
import { usePathname } from "next/navigation";

export default function LogoutButton() {
  const [isUser, setIsUser] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    async function checkUser() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsUser(!!user);
    }
    checkUser();
  }, [pathname]);

  return (
    isUser && (
      <button
        onClick={signout}
        className="text-md w-20 rounded-md bg-gray-700 py-1 text-gray-300 transition-all hover:cursor-pointer active:bg-gray-700/50 active:text-gray-300/50"
      >
        Log out
      </button>
    )
  );
}
