"use client";

import { useEffect, useRef, useState } from "react";
import { Database } from "../lib/database.types";
import TodoItem from "./TodoItem";

type todoEditorProps = {
  todo?: Database["public"]["Tables"]["todos"]["Row"];
};

export default function TodoEditor({ todo }: todoEditorProps) {
  const [todoTitle, setTodoTitle] = useState(todo?.title);
  const [todoList, setTodoList] = useState(() => {
    if (todo) return [...todo?.list, { text: "", done: false }];
  });
  const ref = useRef<HTMLInputElement[]>([]);

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

  function addItem() {
    setTodoList((todoList) => {
      const temp = JSON.parse(JSON.stringify(todoList));
      temp.push({ text: "", done: false });
      return temp;
    });
  }

  function removeItem(index: number) {
    if (index === 0) return;
    setTodoList((todoList) => {
      const temp = JSON.parse(JSON.stringify(todoList));
      return temp.filter((_: unknown, i: number) => i !== index - 1);
    });
  }

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (
        e.key === "Enter" ||
        e.key === "Tab" ||
        e.key == "ArrowUp" ||
        e.key === "ArrowDown" ||
        (e.key === "Backspace" && e.ctrlKey)
      ) {
        e.preventDefault();
        const arr = ref.current;
        const focused = arr.findIndex((element) => element === e.target);
        if ((e.key === "Tab" && !e.shiftKey) || e.key === "ArrowDown") {
          const index = (focused + 1) % arr.length;
          const inputLength = arr[index].value.length;
          arr[index].focus();
          arr[index].setSelectionRange(inputLength, inputLength);
        }
        if ((e.key === "Tab" && e.shiftKey) || e.key === "ArrowUp") {
          const index =
            (((focused > 0 ? focused - 1 : arr.length - 1) % arr.length) +
              arr.length) %
            arr.length;
          const inputLength = arr[index].value.length;
          arr[index].focus();
          arr[index].setSelectionRange(inputLength, inputLength);
        }
        if (e.key === "Enter") {
          if (focused === todoList?.length) addItem();
          else if (focused > 0) handleCheck(focused - 1);
        }
        if (e.key === "Backspace" && e.ctrlKey) {
          if (focused > 0) removeItem(focused);
        }
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [todoList?.length]);

  return (
    <div className="px-5 pt-3">
      <input
        ref={(node) => {
          const arr = ref.current;
          arr[0] = node!;
          return () => {
            arr.splice(0, 1);
          };
        }}
        value={todoTitle ?? "Untitled"}
        onChange={(e) => setTodoTitle(e.target.value)}
        className={`field-sizing-content pe-4 text-2xl text-gray-200 placeholder:text-gray-500`}
      />
      <ul className="flex h-full flex-col items-start py-3">
        {todoList?.map((item, index) => {
          return (
            <TodoItem
              key={index}
              ref={(node) => {
                const arr = ref.current;
                arr[index + 1] = node!;
                return () => {
                  arr.splice(index + 1, 1);
                };
              }}
              index={index}
              text={item.text}
              checked={item.done}
              onText={handleText}
              onCheck={handleCheck}
              removeItem={removeItem}
              addItem={addItem}
              type={index !== todoList.length - 1 ? "normal" : "add-button"}
            />
          );
        })}
      </ul>
    </div>
  );
}
