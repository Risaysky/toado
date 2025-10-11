"use client";

import Link from "next/link";
import { Database } from "../lib/database.types";

type todoPreviewProps = {
  todo: Database["public"]["Tables"]["todos"]["Row"];
};

export default function TodoPreview({ todo }: todoPreviewProps) {
  const visibleList = todo.list.slice(0, 4);

  return (
    <Link href={`/todos/${todo.uuid}`}>
      <div className="overflow-clip rounded-xl border border-gray-700 hover:cursor-pointer">
        <h2
          className={`bg-gray-700 ps-2 text-lg ${todo.title ? "text-gray-200" : "text-gray-400"} `}
        >
          {todo.title ?? "Untitled"}
        </h2>
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
