import { RefCallback } from "react";

type todoItemProps = {
  ref: RefCallback<HTMLInputElement>;
  index: number;
  text: string;
  checked: boolean;
  onText: (text: string, index: number) => void;
  onCheck: (index: number) => void;
  removeItem: (index: number) => void;
  addItem: () => void;
  type: "normal" | "add-button";
};

export default function TodoItem({
  ref,
  index,
  text,
  checked,
  onText,
  onCheck,
  removeItem,
  addItem,
  type,
}: todoItemProps) {
  return (
    <li className="space-x-1.5">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onCheck(index)}
        disabled={type === "add-button"}
      />
      <input
        ref={ref}
        className={`${checked && "text-gray-200/70 line-through"} field-sizing-content min-w-20 pe-2 placeholder-gray-500`}
        type="text"
        value={text}
        placeholder={type === "add-button" ? "Add a new item" : ""}
        onChange={(e) => {
          onText(e.target.value, index);
          if (type === "add-button") addItem();
        }}
        onBlur={() => {
          if (type === "normal" && !text) removeItem(index + 1);
        }}
      />
      {type === "normal" && (
        <button
          className="h-4 w-4 cursor-pointer content-center bg-gray-800 text-center text-xs text-gray-500 opacity-25 hover:opacity-100"
          onClick={() => removeItem(index + 1)}
        >
          x
        </button>
      )}
    </li>
  );
}
