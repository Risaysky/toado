type buttonProps = { children: React.ReactNode };

export default function Button({ children }: buttonProps) {
  return (
    <button className="w-40 rounded-md bg-gray-700 py-3 text-lg active:bg-gray-700/50">
      {children}
    </button>
  );
}
