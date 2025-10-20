"use client";

import { usePathname, useRouter } from "next/navigation";
import { addTodo } from "../lib/addTodo";
import { revalidateTodos } from "../lib/revalidateTodos";

export default function BottomBar() {
  const router = useRouter();
  const path = usePathname();

  return (
    <div className="fixed bottom-4 w-full">
      <div className="mx-auto flex w-fit items-center justify-center divide-x-2 divide-gray-700 rounded-xl border border-gray-700 bg-gray-800 px-0.5 py-1.5 shadow-md">
        <button
          className="cursor-pointer p-1"
          onClick={() => {
            if (path === "/todos") {
              revalidateTodos();
            } else {
              router.push("/todos");
            }
          }}
        >
          {path === "/todos" ? "🔃" : "🏠"}
        </button>
        <button
          className="cursor-pointer p-1"
          onClick={() => {
            addTodo();
          }}
        >
          ➕
        </button>
      </div>
    </div>
  );
}
