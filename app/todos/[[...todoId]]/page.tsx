"use client";

import TodoPreview from "@/app/components/TodoPreview";
import { useParams } from "next/navigation";
import TodoEditor from "@/app/components/TodoEditor";
import { useQuery } from "@tanstack/react-query";
import { getTodos } from "@/app/lib/getTodos";

export default function Page({}) {
  const { data: todos } = useQuery({ queryFn: getTodos, queryKey: ["todos"] });
  // const todos = [
  //   {
  //     created_at: "dfs",
  //     list: [{ text: "yuou", done: true }],
  //     title: null,
  //     user_id: "df",
  //     uuid: "dfs",
  //   },
  // ];
  const { todoId } = useParams();
  const selectedTodo = todos?.find((todo) => todo.uuid === todoId?.[0]);

  if (!todoId) {
    return (
      <div className="grid grid-cols-1 gap-5 px-6 py-8">
        {todos?.map((todo, index) => (
          <TodoPreview key={index} todo={todo} />
        ))}
      </div>
    );
  }

  return <TodoEditor todo={selectedTodo} />;
}
