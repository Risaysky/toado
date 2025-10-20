"use client";

import { usePathname, useRouter } from "next/navigation";
import { addTodo } from "../lib/todoActions";
import { revalidateTodos } from "../lib/todoActions";
import { ClipLoader } from "react-spinners";
import { useTransition } from "react";

export default function BottomBar() {
  const router = useRouter();
  const path = usePathname();
  const [isRevalidatePending, startRevalidateTransition] = useTransition();
  const [isAddPending, startAddTransition] = useTransition();

  return (
    <div className="fixed bottom-4 w-full">
      <div className="mx-auto flex w-fit items-center justify-center divide-x-2 divide-gray-700 rounded-xl border border-gray-700 bg-gray-800 px-0.5 py-1.5 shadow-md">
        <button
          className="flex h-7 w-9 cursor-pointer items-center justify-center"
          onClick={() => {
            if (path === "/todos") {
              startRevalidateTransition(revalidateTodos);
            } else {
              router.push("/todos");
            }
          }}
        >
          {isRevalidatePending ? (
            <ClipLoader color="#e5e7eb" size={"1rem"} />
          ) : path === "/todos" ? (
            "🔃"
          ) : (
            "🏠"
          )}
        </button>
        <button
          className="flex h-7 w-9 cursor-pointer items-center justify-center"
          onClick={() => {
            startAddTransition(addTodo);
          }}
        >
          {isAddPending ? <ClipLoader color="#e5e7eb" size={"1rem"} /> : "➕"}
        </button>
      </div>
    </div>
  );
}
