"use client";
import Link from "next/link";
import { Database } from "../lib/database.types";
import { deleteTodo } from "../lib/todoActions";
import { useTransition } from "react";
import { ClipLoader } from "react-spinners";

type todoPreviewProps = {
  todo: Database["public"]["Tables"]["todos"]["Row"];
};

export default function TodoPreview({ todo }: todoPreviewProps) {
  const [isDeletePending, startDeleteTransition] = useTransition();
  const visibleList = todo.list.slice(0, 4);

  return (
    <Link prefetch={true} href={`/todos/${todo.uuid}`}>
      <div className="cursor-pointer overflow-clip rounded-xl border border-gray-700 active:opacity-45">
        <div className="flex h-fit items-center justify-between bg-gray-700 px-2">
          <h2
            className={`text-lg ${todo.title ? "text-gray-200" : "text-gray-400"} `}
          >
            {todo.title ?? "Untitled"}
          </h2>
          <button
            className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-3xl bg-gray-500 text-sm text-gray-700 active:bg-red-500"
            onClick={(e) => {
              e.preventDefault();
              startDeleteTransition(() => {
                deleteTodo(todo.uuid);
              });
            }}
          >
            {isDeletePending ? (
              <ClipLoader color="#364153" size=".75rem" />
            ) : (
              "x"
            )}
          </button>
        </div>
        <ul className="h-full bg-gray-800 py-3 ps-2">
          {visibleList?.map((item, index) => (
            <li key={index}>{`${item.done ? "✓" : "✗"} ${item.text}`}</li>
          ))}
          {visibleList.length === todo.list.length ? (
            ""
          ) : (
            <li key="ellipsis" className="text-gray-400">
              ...more
            </li>
          )}
        </ul>
      </div>
    </Link>
  );
}
