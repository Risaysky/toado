"use client";

import { useState } from "react";
import { Database } from "../lib/database.types";
import TodoItem from "./TodoItem";

type todoEditorProps = {
  todo?: Database["public"]["Tables"]["todos"]["Row"];
};

export default function TodoEditor({ todo }: todoEditorProps) {
  const [todoTitle, setTodoTitle] = useState(todo?.title);
  const [todoList, setTodoList] = useState(todo?.list);

  function handleText(text: string, index: number) {
    setTodoList((todoList) => {
      const temp = JSON.parse(JSON.stringify(todoList));
      temp[index].text = text;
      return temp;
    });
  }

  function handleCheck(index: number) {
    setTodoList((todoList) => {
      const temp = JSON.parse(JSON.stringify(todoList));
      temp[index].done = !temp[index].done;
      return temp;
    });
  }

  function removeItem(index: number) {
    setTodoList((todoList) => {
      const temp = JSON.parse(JSON.stringify(todoList));
      return temp.filter((_: unknown, i: number) => i !== index);
    });
  }

  return (
    <div className="px-5 pt-3">
      <input
        value={todoTitle ?? "Untitled"}
        onChange={(e) => setTodoTitle(e.target.value)}
        className={`text-2xl text-gray-200 placeholder:text-gray-500`}
      />
      <ul className="flex h-full flex-col py-3">
        {todoList?.map((item, index) => (
          <TodoItem
            key={index}
            index={index}
            text={item.text}
            checked={item.done}
            onText={handleText}
            onCheck={handleCheck}
            removeItem={removeItem}
          />
        ))}
      </ul>
    </div>
  );
}
