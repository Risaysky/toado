"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Database } from "../lib/database.types";
import TodoItem from "./TodoItem";
import { updateTodo } from "../lib/todoActions";
import { ClipLoader } from "react-spinners";

type todoEditorProps = {
  todo?: Database["public"]["Tables"]["todos"]["Row"];
};

export default function TodoEditor({ todo }: todoEditorProps) {
  const [todoTitle, setTodoTitle] = useState(todo?.title);
  const [todoList, setTodoList] = useState(() => {
    if (todo) return [...todo?.list, { text: "", done: false }];
  });
  const ref = useRef<HTMLInputElement[]>([]);
  const [isUpdatePending, startUpdateTransition] = useTransition();
  const isChanged =
    JSON.stringify(todo?.title) === JSON.stringify(todoTitle) &&
    JSON.stringify(todo?.list) === JSON.stringify(todoList?.slice(0, -1));

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
    <div className="px-4 pt-3">
      <div className="flex justify-between">
        <input
          ref={(node) => {
            const arr = ref.current;
            arr[0] = node!;
            return () => {
              arr.splice(0, 1);
            };
          }}
          value={todoTitle ?? ""}
          placeholder="Untitled"
          onChange={(e) => setTodoTitle(e.target.value)}
          className={`field-sizing-content pe-4 text-2xl text-gray-200 placeholder-gray-500`}
        />
        <button
          className="w-20 cursor-pointer rounded-md bg-gray-700 py-1 text-gray-300 transition-all active:bg-gray-700/50 active:text-gray-300/50 disabled:cursor-default disabled:bg-gray-800 disabled:text-gray-500"
          disabled={isChanged}
          onClick={() =>
            startUpdateTransition(() => {
              updateTodo({
                ...todo,
                title: todoTitle,
                list: todoList?.slice(0, -1),
              });
            })
          }
        >
          {isUpdatePending ? (
            <ClipLoader color="#d1d5dc" size=".75rem" />
          ) : (
            "Save"
          )}
        </button>
      </div>
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
