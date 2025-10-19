"use client";
import Link from "next/link";

export default function BottomBar() {
  return (
    <div className="fixed bottom-4 w-full">
      <div className="mx-auto flex w-fit items-center justify-center divide-x-2 divide-gray-700 rounded-xl border border-gray-700 bg-gray-800 px-0.5 py-1.5 shadow-md">
        <Link className="cursor-pointer px-1 py-1" href={"/todos"}>
          🏠
        </Link>
        <button className="cursor-pointer px-1 py-1" onClick={() => {}}>
          ➕
        </button>
      </div>
    </div>
  );
}
