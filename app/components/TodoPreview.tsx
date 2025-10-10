type todoPreviewProps = {
  title: string;
  list: {
    done: boolean;
    text: string;
  }[];
};

export default function TodoPreview({ title, list }: todoPreviewProps) {
  return (
    <div className="overflow-clip rounded-2xl border border-gray-700">
      <div className="h-6 bg-gray-700 px-1">
        <h2>{title}</h2>
      </div>
      <ul className="h-full bg-gray-800 px-1">
        {list?.map((item, index) => (
          <li key={index}>{`${item.text} --- ${item.done}`}</li>
        ))}
      </ul>
    </div>
  );
}
