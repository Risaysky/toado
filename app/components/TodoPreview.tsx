type todoPreviewProps = {
  title: string;
  list: {
    done: boolean;
    text: string;
  }[];
};

export default function TodoPreview({ title, list }: todoPreviewProps) {
  return (
    <div className="overflow-clip rounded-xl border border-gray-700">
      <h2
        className={`bg-gray-700 ps-2 text-lg ${title ? "text-gray-200" : "text-gray-400"} `}
      >
        {title ?? "Untitled"}
      </h2>
      <ul className="h-full bg-gray-800 py-3 ps-2">
        {list?.map((item, index) => (
          <li key={index}>{`${item.done ? "✓" : "✗"} ${item.text}`}</li>
        ))}
      </ul>
    </div>
  );
}
