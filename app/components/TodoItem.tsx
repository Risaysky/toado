import { RefCallback } from "react";

type todoItemProps = {
  ref: RefCallback<HTMLInputElement>;
  index: number;
  text: string;
  checked: boolean;
  onText: (text: string, index: number) => void;
  onCheck: (index: number) => void;
  removeItem: (index: number) => void;
};

export default function TodoItem({
  ref,
  index,
  text,
  checked,
  onText,
  onCheck,
  removeItem,
}: todoItemProps) {
  return (
    <li className="space-x-1.5">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onCheck(index)}
      />
      <input
        ref={ref}
        className="field-sizing-content pe-2"
        type="text"
        value={text}
        onChange={(e) => onText(e.target.value, index)}
        onBlur={() => (text ? "" : removeItem(index))}
      />
      <button
        className="h-4 w-4 cursor-pointer content-center bg-gray-800 text-center text-xs text-gray-500 opacity-25 hover:opacity-100"
        onClick={() => removeItem(index)}
      >
        x
      </button>
    </li>
  );
}
